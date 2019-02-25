import { WGS84 } from '../constants/ellipsoids';
import { BGS_2005_KK } from '../constants/projections';
import { toRad, toDeg, calculateQParameter, calculateWParameter, calculateCentralPointX } from '../common/helpers';

/**
 * Transforms geographic coordinates to projected in Lambert projection. You can pass single point or
 * array of points.
 * @public
 * @param {!Array.<Number>|Array} coordinates - coordinates in [Latitude, Longitude] or array of points
 * @param {Object.<String,*>} [outputProjection=BGS_2005_KK] - output projection
 * @param {Object.<String,*>} [outputEllipsoid=WGS84] - output ellipsoid
 * @return {Array.<Number>|Array}
 */
export const transformGeographicToLambert = function(coordinates, outputProjection = BGS_2005_KK, outputEllipsoid = WGS84) {
  // are we transforming single point or set of points
  const isArray = Array.isArray(coordinates[0]);
  // points to be transformed
  let points = isArray ? coordinates : [coordinates];

  const Lon0 = toRad(outputProjection.Lon0),
    Lat1 = toRad(outputProjection.Lat1),
    Lat2 = toRad(outputProjection.Lat2),
    w1 = calculateWParameter(Lat1, outputEllipsoid),
    w2 = calculateWParameter(Lat2, outputEllipsoid),
    Q1 = calculateQParameter(Lat1, outputEllipsoid),
    Q2 = calculateQParameter(Lat2, outputEllipsoid),
    Lat0 = Math.asin(Math.log((w2 * Math.cos(Lat1)) / (w1 * Math.cos(Lat2))) / (Q2 - Q1)),
    Q0 = calculateQParameter(Lat0, outputEllipsoid),
    Re = (outputEllipsoid.a * Math.cos(Lat1) * Math.exp(Q1 * Math.sin(Lat0))) / w1 / Math.sin(Lat0),
    R0 = Re / Math.exp(Q0 * Math.sin(Lat0)),
    x0 = calculateCentralPointX(Lat0, outputEllipsoid);

  let result = points.map(point => {
    let x = 0.0,
      y = 0.0,
      R = 0.0,
      Q = 0.0,
      gama = 0.0,
      lat = toRad(point[0]),
      lon = toRad(point[1]);

    let A = Math.log((1 + Math.sin(lat)) / (1 - Math.sin(lat))),
      B = outputEllipsoid.e * Math.log((1 + outputEllipsoid.e * Math.sin(lat)) / (1 - outputEllipsoid.e * Math.sin(lat)));

    Q = (A - B) / 2;
    R = Re / Math.exp(Q * Math.sin(Lat0));

    gama = (lon - Lon0) * Math.sin(Lat0);

    x = R0 + x0 - R * Math.cos(gama);
    y = outputProjection.y0 + R * Math.sin(gama);

    return [x, y];
  });

  return isArray ? result : result[0];
};
/**
 * Transforms projected in Lambert projection to geographic coordinates. You can pass single point or
 * array of points.
 * @public
 * @param {!Array.<Number>|Array} coordinates - coordinates in [Northing, Easting] or array of points
 * @param {Object.<String,*>} [inputProjection=BGS_2005_KK] - input projection
 * @param {Object.<String,*>} [inputEllipsoid=WGS84] - input ellipsoid
 * @return {Array.<Number>|Array}
 */
export const transformLambertToGeographic = function(coordinates, inputProjection = BGS_2005_KK, inputEllipsoid = WGS84) {
  // are we transforming single point or set of points
  const isArray = Array.isArray(coordinates[0]);
  // points to be transformed
  let points = isArray ? coordinates : [coordinates];

  const Lon0 = toRad(inputProjection.Lon0),
    Lat1 = toRad(inputProjection.Lat1),
    Lat2 = toRad(inputProjection.Lat2),
    w1 = calculateWParameter(Lat1, inputEllipsoid),
    w2 = calculateWParameter(Lat2, inputEllipsoid),
    Q1 = calculateQParameter(Lat1, inputEllipsoid),
    Q2 = calculateQParameter(Lat2, inputEllipsoid),
    Lat0 = Math.asin(Math.log((w2 * Math.cos(Lat1)) / (w1 * Math.cos(Lat2))) / (Q2 - Q1)),
    Q0 = calculateQParameter(Lat0, inputEllipsoid),
    Re = (inputEllipsoid.a * Math.cos(Lat1) * Math.exp(Q1 * Math.sin(Lat0))) / w1 / Math.sin(Lat0),
    R0 = Re / Math.exp(Q0 * Math.sin(Lat0)),
    x0 = calculateCentralPointX(Lat0, inputEllipsoid);

  let result = points.map(point => {
    let lat = 0.0,
      lon = 0.0,
      f1 = 0.0,
      f2 = 0.0,
      Latp = 0.0,
      R = 0.0,
      Q = 0.0,
      gama = 0.0,
      x = point[0],
      y = point[1];

    // determine latitude iteratively
    R = Math.sqrt(Math.pow(y - inputProjection.y0, 2) + Math.pow(R0 + x0 - x, 2));
    Q = Math.log(Re / R) / Math.sin(Lat0);
    Latp = Math.asin((Math.exp(2 * Q) - 1) / (Math.exp(2 * Q) + 1));

    for (let i = 0; i < 10; i++) {
      f1 =
        (Math.log((1 + Math.sin(Latp)) / (1 - Math.sin(Latp))) -
          inputEllipsoid.e * Math.log((1 + inputEllipsoid.e * Math.sin(Latp)) / (1 - inputEllipsoid.e * Math.sin(Latp)))) /
          2 -
        Q;
      f2 = 1 / (1 - Math.pow(Math.sin(Latp), 2)) - inputEllipsoid.e2 / (1 - inputEllipsoid.e2 * Math.pow(Math.sin(Latp), 2));
      lat = Math.asin(Math.sin(Latp) - f1 / f2);

      if (Math.abs(lat - Latp) <= 0.0000000001) {
        break;
      } else {
        Latp = lat;
      }
    }

    // determine longitude
    gama = Math.atan((y - inputProjection.y0) / (R0 + x0 - x));
    lon = gama / Math.sin(Lat0) + Lon0;

    return [toDeg(lat), toDeg(lon)];
  });

  return isArray ? result : result[0];
};
