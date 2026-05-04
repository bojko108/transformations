import * as projections from '../constants/projections';
import * as ControlPoints from '../controlPoints';
import { Affine, Helmert, Polynomial, TPS } from 'transformation-models';
import { buffer as bufferExtent, calculateExtent } from '../common/helpers';

export const TransformationModel = Object.freeze({
  AFFINE: 'affine',
  HELMERT: 'helmert',
  POLYNOMIAL: 'polynomial',
  TPS: 'tps'
});

/**
 * Class for transforming coordinates between BGS coordinate systems
 */
export class BGSCoordinates {
  /**
   * Initializes all control points for transforming between BGS coordinate systems
   */
  constructor() {
    this._controlPoints = {
      [projections.BGS_1930_24.name]: new ControlPoints.BGS193024(),
      [projections.BGS_1930_27.name]: new ControlPoints.BGS193027(),
      [projections.BGS_1950_3_24.name]: new ControlPoints.BGS1950324(),
      [projections.BGS_1950_3_27.name]: new ControlPoints.BGS1950327(),
      [projections.BGS_1950_6_21.name]: new ControlPoints.BGS1950621(),
      [projections.BGS_1950_6_27.name]: new ControlPoints.BGS1950627(),
      [projections.BGS_1970_K3.name]: new ControlPoints.BGS1970K3(),
      [projections.BGS_1970_K5.name]: new ControlPoints.BGS1970K5(),
      [projections.BGS_1970_K7.name]: new ControlPoints.BGS1970K7(),
      [projections.BGS_1970_K9.name]: new ControlPoints.BGS1970K9(),
      [projections.BGS_2005_KK.name]: new ControlPoints.BGS2005KK()
    };
  }

  /**
   * Transforms from BGS 1930, BGS1950, BGS Sofia, BGS 1970 or BGS 2005 projected coordinates to the specified projection.
   * Transforms a point by calculating local transformation parameters. Transformation parameters are calculated using predefined
   * control points. Control points are searched within the provided `extent`.
   * @public
   * @param {!Array.<Number>} inputPoints - coordinates in [Northing, Easting]
   * @param {Object.<String,*>} [inputProjection=projections.BGS_1970_K9] - input point is in this projection
   * @param {Object.<String,*>} [outputProjection=projections.BGS_2005_KK] - result point projection
   * @param {String} [transformationModel=TransformationModel.POLYNOMIAL] - the transformation model to use
   * @param {Array.<Number>} [extent=[]] - by default the extent will be calculated based on input points array
   * @param {Number} [buffer=0] - extend the extent with this value in meters
   */
  transformArray(
    inputPoints,
    inputProjection = projections.BGS_1970_K9,
    outputProjection = projections.BGS_2005_KK,
    transformationModel = TransformationModel.POLYNOMIAL,
    extent = [],
    buffer = 0
  ) {
    extent = extent.length > 0 ? extent : calculateExtent(inputPoints);

    // transformation parameters will be calculated for the following extent
    extent = bufferExtent(extent, buffer);

    const inputControlPoints =
      inputProjection.name === projections.BGS_SOFIA.name
        ? this._controlPoints[projections.BGS_1950_3_24.name]
        : this._controlPoints[inputProjection.name];
    const outputControlPoints =
      outputProjection.name == projections.BGS_SOFIA.name
        ? this._controlPoints[projections.BGS_1950_3_24.name]
        : this._controlPoints[outputProjection.name];
    const inputGeoPoints = inputControlPoints.getPointsInExtent(extent);
    const outputGeoPoints = outputControlPoints.getPointsById(inputGeoPoints.map(p => p.id));

    let transform;
    if (transformationModel === TransformationModel.TPS)
      transform = new TPS(inputGeoPoints.map(p => [p.x, p.y]), outputGeoPoints.map(p => [p.x, p.y]));
    else if (transformationModel === TransformationModel.AFFINE)
      transform = new Affine(inputGeoPoints.map(p => [p.x, p.y]), outputGeoPoints.map(p => [p.x, p.y]));
    else if (transformationModel === TransformationModel.HELMERT)
      transform = new Helmert(inputGeoPoints.map(p => [p.x, p.y]), outputGeoPoints.map(p => [p.x, p.y]));
    else
      transform = new Polynomial(inputGeoPoints.map(p => [p.x, p.y]), outputGeoPoints.map(p => [p.x, p.y]));

    let result = inputPoints.map(point => {
      if (inputProjection.name === projections.BGS_SOFIA.name) {
        point[0] += projections.BGS_SOFIA.x0;
        point[1] += projections.BGS_SOFIA.y0;
      }

      let resultPoint = transform.forward(point);
      if (outputProjection.name === projections.BGS_SOFIA.name) {
        resultPoint[0] -= projections.BGS_SOFIA.x0;
        resultPoint[1] -= projections.BGS_SOFIA.y0;
      }

      return resultPoint;
    });

    return result;
  }

  /**
   * Transforms from BGS 1930, BGS1950, BGS Sofia, BGS 1970 or BGS 2005 projected coordinates to the specified projection.
   * Transforms a point by calculating local transformation parameters. Transformation parameters are calculated using predefined
   * control points. Control points are searched within 20 000m around the input point. If the point is close to the border of
   * the projection an exception will be thrown.
   * @public
   * @param {!Array.<Number>} inputPoint - coordinates in [Northing, Easting]
   * @param {Object.<String,*>} [inputProjection=projections.BGS_1970_K9] - input point is in this projection
   * @param {Object.<String,*>} [outputProjection=projections.BGS_2005_KK] - result point projection
   * @param {String} [transformationModel=TransformationModel.POLYNOMIAL] - the transformation model to use
   * @param {Number} [distance=5000] - the distance within which to search for control points
   * @return {Array.<Number>}
   */
  transform(
    inputPoint, 
    inputProjection = projections.BGS_1970_K9,
    outputProjection = projections.BGS_2005_KK, 
    transformationModel = TransformationModel.POLYNOMIAL,
    distance = 5000) {

    if (inputProjection.name === projections.BGS_SOFIA.name) {
      inputPoint[0] += projections.BGS_SOFIA.x0;
      inputPoint[1] += projections.BGS_SOFIA.y0;
    }

    const inputControlPoints =
      inputProjection.name === projections.BGS_SOFIA.name
        ? this._controlPoints[projections.BGS_1950_3_24.name]
        : this._controlPoints[inputProjection.name];
    const outputControlPoints =
      outputProjection.name == projections.BGS_SOFIA.name
        ? this._controlPoints[projections.BGS_1950_3_24.name]
        : this._controlPoints[outputProjection.name];
    const inputGeoPoints = inputControlPoints.getPointsWithin(inputPoint, distance);
    const outputGeoPoints = outputControlPoints.getPointsById(inputGeoPoints.map(p => p.id));

    let resultPoint = [];

    let transform;
    if (transformationModel === TransformationModel.TPS)
      transform = new TPS(inputGeoPoints.map(p => [p.x, p.y]), outputGeoPoints.map(p => [p.x, p.y]));
    else if (transformationModel === TransformationModel.AFFINE)
      transform = new Affine(inputGeoPoints.map(p => [p.x, p.y]), outputGeoPoints.map(p => [p.x, p.y]));
    else if (transformationModel === TransformationModel.HELMERT)
      transform = new Helmert(inputGeoPoints.map(p => [p.x, p.y]), outputGeoPoints.map(p => [p.x, p.y]));
    else
      transform = new Polynomial(inputGeoPoints.map(p => [p.x, p.y]), outputGeoPoints.map(p => [p.x, p.y]));

    resultPoint = transform.forward(inputPoint);
    if (outputProjection.name === projections.BGS_SOFIA.name) {
      resultPoint[0] -= projections.BGS_SOFIA.x0;
      resultPoint[1] -= projections.BGS_SOFIA.y0;
    }

    return resultPoint;
  }
}

