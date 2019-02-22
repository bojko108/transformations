import * as ellipsoids from './constants/ellipsoids';
import * as projections from './constants/projections';
import {
  toRad,
  toDeg,
  toDMS,
  toDD,
  arcLengthOfMeridian,
  footpointLatitude,
  calculateQParameter,
  calculateWParameter,
  calculateCentralPointX
} from './common/helpers';
import * as ControlPoints from './controlPoints';
import { Affine, TPS } from 'transformation-models';

export { ellipsoids, projections };

/**
 * Class for transforming coordinates between different coordinate systems
 */
export class Transformations {
  /**
   *
   * @param {Boolean} [useControlPoints=true] - if false, control poitns will not be initialized and
   * transformations between BGS coordinates will be not possible
   */
  constructor(useControlPoints = true) {
    if (useControlPoints) {
      this._controlPoints = {
        [projections.BGS_1930_24.name]: new ControlPoints.BGS193024(),
        [projections.BGS_1930_27.name]: new ControlPoints.BGS193027(),
        [projections.BGS_1950_3_24.name]: new ControlPoints.BGS1950324(),
        [projections.BGS_1950_3_27.name]: new ControlPoints.BGS1950327(),
        [projections.BGS_1950_6_21.name]: new ControlPoints.BGS1950621(),
        [projections.BGS_1950_6_27.name]: new ControlPoints.BGS1950627(),
        [projections.BGS_1970_К3.name]: new ControlPoints.BGS1970K3(),
        [projections.BGS_1970_К5.name]: new ControlPoints.BGS1970K5(),
        [projections.BGS_1970_К7.name]: new ControlPoints.BGS1970K7(),
        [projections.BGS_1970_К9.name]: new ControlPoints.BGS1970K9(),
        [projections.BGS_2005_KK.name]: new ControlPoints.BGS2005KK()
      };
    }
  }

  /**
   * @TODO
   * @param {*} inputPoints
   * @param {*} extent
   * @param {*} inputProjection
   * @param {*} outputProjection
   * @param {*} useTPS
   */
  transformBGSCoordinatesArray(
    inputPoints,
    extent = null,
    inputProjection = projections.BGS_1970_К9,
    outputProjection = projections.BGS_2005_KK,
    useTPS = true
  ) {}

  /**
   * Transforms from BGS 1930, BGS1950, BGS Sofia, BGS 1970 or BGS 2005 projected coordinates to the specified projection.
   * Transforms a point by calculating local transformation parameters. Transformation parameters are calculated using predefined
   * control points. Control points are searched within 20 000m around the input point. If the point is close to the border of
   * the projection an exception will be thrown.
   * @public
   * @param {!Array.<Number>} inputPoint - coordinates in [Northing, Easting]
   * @param {Object.<String,*>} [inputProjection=projections.BGS_1970_К9] - input point is in this projection
   * @param {Object.<String,*>} [outputProjection=projections.BGS_2005_KK] - result point projection
   * @param {Boolean} [useTPS=true] - use TPS instead of Affine transformation
   * @return {Array.<Number>}
   */
  transformBGSCoordinates(inputPoint, inputProjection = projections.BGS_1970_К9, outputProjection = projections.BGS_2005_KK, useTPS = true) {
    const distance = 20000;

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

    const tr = useTPS
      ? new TPS(inputGeoPoints.map(p => [p.x, p.y]), outputGeoPoints.map(p => [p.x, p.y]))
      : new Affine(inputGeoPoints.map(p => [p.x, p.y]), outputGeoPoints.map(p => [p.x, p.y]));

    resultPoint = tr.forward(inputPoint);

    if (outputProjection.name === projections.BGS_SOFIA.name) {
      resultPoint[0] -= projections.BGS_SOFIA.x0;
      resultPoint[1] -= projections.BGS_SOFIA.y0;
    }

    return resultPoint;
  }
  /**
   * Transforms geographic coordinates to projected in Lambert projection. You can pass single point or 
   * array of points.
   * @public
   * @param {!Array.<Number>|Array} coordinates - coordinates in [Latitude, Longitude] or array of points
   * @param {Object.<String,*>} [outputProjection=projections.BGS_2005_KK] - output projection
   * @param {Object.<String,*>} [outputEllipsoid=ellipsoids.WGS84] - output ellipsoid
   * @return {Array.<Number>|Array} 
   */
  transformGeographicToLambert(coordinates, outputProjection = projections.BGS_2005_KK, outputEllipsoid = ellipsoids.WGS84) {
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
  }
  /**
   * Transforms projected in Lambert projection to geographic coordinates. You can pass single point or 
   * array of points.
   * @public
   * @param {!Array.<Number>|Array} coordinates - coordinates in [Northing, Easting] or array of points
   * @param {Object.<String,*>} [inputProjection=projections.BGS_2005_KK] - input projection
   * @param {Object.<String,*>} [inputEllipsoid=ellipsoids.WGS84] - input ellipsoid
   * @return {Array.<Number>|Array} 
   */
  transformLambertToGeographic(coordinates, inputProjection = projections.BGS_2005_KK, inputEllipsoid = ellipsoids.WGS84) {
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
  }
  /**
   * Transforms geographic coordinates to projected in UTM projection. You can pass single point or 
   * array of points.
   * @public
   * @param {!Array.<Number>|Array} coordinates - coordinates in [Latitude, Longitude] or array of points
   * @param {Object.<String,*>} [outputUtmProjection=projections.UTM35N] - output projection
   * @param {Object.<String,*>} [inputEllipsoid=ellipsoids.WGS84] - input ellipsoid
   * @return {Array.<Number>|Array} 
   */
  transformGeographicToUTM(coordinates, outputUtmProjection = projections.UTM35N, inputEllipsoid = ellipsoids.WGS84) {
    return this.transformGeographicToGauss(coordinates, outputUtmProjection, inputEllipsoid);
  }
  /**
   * Transforms projected in UTM projection to geographic coordinates. You can pass single point or 
   * array of points.
   * @public
   * @param {!Array.<Number>|Array} coordinates - coordinates in [Northing, Easting] or array of points
   * @param {Object.<String,*>} [inputUtmProjection=projections.UTM35N] - input projection
   * @param {Object.<String,*>} [outputEllipsoid=ellipsoids.WGS84] - input ellipsoid
   * @return {Array.<Number>|Array} 
   */
  transformUTMToGeographic(coordinates, inputUtmProjection = projections.UTM35N, outputEllipsoid = ellipsoids.WGS84) {
    return this.transformGaussToGeographic(coordinates, inputUtmProjection, outputEllipsoid);
  }
  /**
   * Transforms geographic coordinates to projected in Gauss-Kruger projection. You can pass single point or 
   * array of points.
   * @public
   * @param {!Array.<Number>|Array} coordinates - coordinates in [Latitude, Longitude] or array of points
   * @param {Object.<String,*>} [outputProjection=projections.BGS_1930_24] - output projection
   * @param {Object.<String,*>} [inputEllipsoid=ellipsoids.HAYFORD] - input ellipsoid
   * @return {Array.<Number>|Array} 
   */
  transformGeographicToGauss(coordinates, outputProjection = projections.BGS_1930_24, inputEllipsoid = ellipsoids.HAYFORD) {
    // are we transforming single point or set of points
    const isArray = Array.isArray(coordinates[0]);
    // points to be transformed
    let points = isArray ? coordinates : [coordinates];

    const Lon0 = toRad(outputProjection.Lon0);

    let result = points.map(point => {
      const latitude = toRad(point[0]);
      const longitude = toRad(point[1]);

      let easting = 0.0,
        northing = 0.0;

      let phi = arcLengthOfMeridian(latitude, inputEllipsoid),
        nu2 = inputEllipsoid.ep2 * Math.pow(Math.cos(latitude), 2.0),
        n = Math.pow(inputEllipsoid.a, 2.0) / (inputEllipsoid.b * Math.sqrt(1 + nu2)),
        t = Math.tan(latitude),
        t2 = t * t,
        l = longitude - Lon0,
        coef13 = 1.0 - t2 + nu2,
        coef14 = 5.0 - t2 + 9 * nu2 + 4.0 * (nu2 * nu2),
        coef15 = 5.0 - 18.0 * t2 + t2 * t2 + 14.0 * nu2 - 58.0 * t2 * nu2,
        coef16 = 61.0 - 58.0 * t2 + t2 * t2 + 270.0 * nu2 - 330.0 * t2 * nu2,
        coef17 = 61.0 - 479.0 * t2 + 179.0 * (t2 * t2) - t2 * t2 * t2,
        coef18 = 1385.0 - 3111.0 * t2 + 543.0 * (t2 * t2) - t2 * t2 * t2;

      easting =
        n * Math.cos(latitude) * l +
        (n / 6.0) * Math.pow(Math.cos(latitude), 3.0) * coef13 * Math.pow(l, 3.0) +
        (n / 120.0) * Math.pow(Math.cos(latitude), 5.0) * coef15 * Math.pow(l, 5.0) +
        (n / 5040.0) * Math.pow(Math.cos(latitude), 7.0) * coef17 * Math.pow(l, 7.0);

      northing =
        phi +
        (t / 2.0) * n * Math.pow(Math.cos(latitude), 2.0) * Math.pow(l, 2.0) +
        (t / 24.0) * n * Math.pow(Math.cos(latitude), 4.0) * coef14 * Math.pow(l, 4.0) +
        (t / 720.0) * n * Math.pow(Math.cos(latitude), 6.0) * coef16 * Math.pow(l, 6.0) +
        (t / 40320.0) * n * Math.pow(Math.cos(latitude), 8.0) * coef18 * Math.pow(l, 8.0);

      northing *= outputProjection.scale;
      easting *= outputProjection.scale;
      easting += outputProjection.y0;

      return [northing, easting];
    });

    return isArray ? result : result[0];
  }
  /**
   * Transforms projected in Gauss-Kruger projection to geographic coordinates. You can pass single point or 
   * array of points.
   * @public
   * @param {!Array.<Number>|Array} coordinates - coordinates in [Northing, Easting] or array of points
   * @param {Object.<String,*>} [inputProjection=projections.BGS_1930_24] - input projection
   * @param {Object.<String,*>} [outputEllipsoid=ellipsoids.HAYFORD] - input ellipsoid
   * @return {Array.<Number>|Array} 
   */
  transformGaussToGeographic(coordinates, inputProjection = projections.BGS_1930_24, outputEllipsoid = ellipsoids.HAYFORD) {
    // are we transforming single point or set of points
    const isArray = Array.isArray(coordinates[0]);
    // points to be transformed
    let points = isArray ? coordinates : [coordinates];

    const Lon0 = toRad(inputProjection.Lon0);

    let result = points.map(point => {
      let latitude = 0.0,
        longitude = 0.0;

      let easting = point[1];
      easting -= inputProjection.y0;
      easting /= inputProjection.scale;
      let northing = point[0];
      northing /= inputProjection.scale;

      let phif,
        Nf,
        Nfpow,
        nuf2,
        tf,
        tf2,
        tf4,
        cf,
        x1frac,
        x2frac,
        x3frac,
        x4frac,
        x5frac,
        x6frac,
        x7frac,
        x8frac,
        x2poly,
        x3poly,
        x4poly,
        x5poly,
        x6poly,
        x7poly,
        x8poly;

      phif = footpointLatitude(northing, outputEllipsoid);

      cf = Math.cos(phif);
      nuf2 = outputEllipsoid.ep2 * Math.pow(cf, 2.0);
      Nf = Math.pow(outputEllipsoid.a, 2.0) / (outputEllipsoid.b * Math.sqrt(1 + nuf2));
      Nfpow = Nf;
      tf = Math.tan(phif);
      tf2 = tf * tf;
      tf4 = tf2 * tf2;
      x1frac = 1.0 / (Nfpow * cf);
      Nfpow *= Nf;
      x2frac = tf / (2.0 * Nfpow);
      Nfpow *= Nf;
      x3frac = 1.0 / (6.0 * Nfpow * cf);
      Nfpow *= Nf;
      x4frac = tf / (24.0 * Nfpow);
      Nfpow *= Nf;
      x5frac = 1.0 / (120.0 * Nfpow * cf);
      Nfpow *= Nf;
      x6frac = tf / (720.0 * Nfpow);
      Nfpow *= Nf;
      x7frac = 1.0 / (5040.0 * Nfpow * cf);
      Nfpow *= Nf;
      x8frac = tf / (40320.0 * Nfpow);

      x2poly = -1 - nuf2;
      x3poly = -1 - 2 * tf2 - nuf2;
      x4poly = 5.0 + 3.0 * tf2 + 6.0 * nuf2 - 6.0 * tf2 * nuf2 - 3.0 * (nuf2 * nuf2) - 9.0 * tf2 * (nuf2 * nuf2);
      x5poly = 5.0 + 28.0 * tf2 + 24.0 * tf4 + 6.0 * nuf2 + 8.0 * tf2 * nuf2;
      x6poly = -61.0 - 90.0 * tf2 - 45.0 * tf4 - 107.0 * nuf2 + 162.0 * tf2 * nuf2;
      x7poly = -61.0 - 662.0 * tf2 - 1320.0 * tf4 - 720.0 * (tf4 * tf2);
      x8poly = 1385.0 + 3633.0 * tf2 + 4095.0 * tf4 + 1575 * (tf4 * tf2);

      latitude =
        phif +
        x2frac * x2poly * Math.pow(easting, 2) +
        x4frac * x4poly * Math.pow(easting, 4.0) +
        x6frac * x6poly * Math.pow(easting, 6.0) +
        x8frac * x8poly * Math.pow(easting, 8.0);

      longitude =
        Lon0 +
        x1frac * easting +
        x3frac * x3poly * Math.pow(easting, 3.0) +
        x5frac * x5poly * Math.pow(easting, 5.0) +
        x7frac * x7poly * Math.pow(easting, 7.0);

      return [toDeg(latitude), toDeg(longitude)];
    });

    return isArray ? result : result[0];
  }
  /**
   * Transforms geographic coordinates to geocentric. You can pass single point or 
   * array of points.
   * @public
   * @param {!Array.<Number>|Array} coordinates - coordinates in [Latitude, Longitude] or array of points
   * @param {Object.<String,*>} [outputEllipsoid=ellipsoids.WGS84] - output ellipsoid
   * @return {Array.<Number>|Array} 
   */
  transformGeographicToGeocentric(coordinates, outputEllipsoid = ellipsoids.WGS84) {
    const latitude = toRad(coordinates[0]),
      longitude = toRad(coordinates[1]),
      h = coordinates[2] || 0.0,
      N =
        Math.pow(outputEllipsoid.a, 2) /
        Math.sqrt(
          Math.pow(outputEllipsoid.a, 2) * Math.pow(Math.cos(latitude), 2) + Math.pow(outputEllipsoid.b, 2) * Math.pow(Math.sin(latitude), 2)
        );

    let X = (N + h) * Math.cos(latitude) * Math.cos(longitude),
      Y = (N + h) * Math.cos(latitude) * Math.sin(longitude),
      Z = ((Math.pow(outputEllipsoid.b, 2) / Math.pow(outputEllipsoid.a, 2)) * N + h) * Math.sin(latitude);

    return [X, Y, Z];
  }
  /**
   * Transforms geocentric geographic coordinates. You can pass single point or 
   * array of points.
   * @public
   * @param {!Array.<Number>|Array} coordinates - coordinates in [X, Y, Z] or array of points
   * @param {Object.<String,*>} [inputEllipsoid=ellipsoids.WGS84] - input ellipsoid
   * @return {Array.<Number>|Array} 
   */
  transformGeocentricToGeographic(coordinates, inputEllipsoid = ellipsoids.WGS84) {
    const X = coordinates[0],
      Y = coordinates[1],
      Z = coordinates[2],
      p = Math.sqrt(Math.pow(X, 2) + Math.pow(Y, 2)),
      e2 = (Math.pow(inputEllipsoid.a, 2) - Math.pow(inputEllipsoid.b, 2)) / Math.pow(inputEllipsoid.a, 2);

    let lat = 0.0,
      lon = Math.atan(Y / X),
      h = 0.0,
      latp = (Z / p) * Math.pow(1 - e2, -1),
      Np = 0.0;

    for (let i = 0; i < 10; i++) {
      Np =
        Math.pow(inputEllipsoid.a, 2) /
        Math.sqrt(Math.pow(inputEllipsoid.a, 2) * Math.pow(Math.cos(latp), 2) + Math.pow(inputEllipsoid.b, 2) * Math.pow(Math.sin(latp), 2));

      h = p / Math.cos(latp) - Np;

      lat = Math.atan((Z / p) * Math.pow(1 - e2 * (Np / (Np + h)), -1));

      if (Math.abs(lat - latp) <= 0.0000000001) {
        break;
      } else {
        latp = lat;
      }
    }

    return [toDeg(lat), toDeg(lon), h];
  }
  /**
   * Transforms geographic coordinates to projected in WebMercator. You can pass single point or 
   * array of points.
   * @public
   * @param {!Array.<Number>|Array} coordinates - coordinates in [Latitude, Longitude] or array of points
   * @return {Array.<Number>|Array} 
   */
  transformGeographicToWebMercator(coordinates) {
    const latitude = coordinates[0],
      longitude = coordinates[1],
      halfRadius = Math.PI * ellipsoids.SPHERE.a;

    let x = (longitude * halfRadius) / 180,
      y = Math.log(Math.tan(((90 + latitude) * Math.PI) / 360)) / (Math.PI / 180);

    y = (y * halfRadius) / 180;

    return [x, y];
  }
  /**
   * Transforms projected coordinates in WebMercator to geographic. You can pass single point or 
   * array of points.
   * @public
   * @param {!Array.<Number>|Array} coordinates - coordinates in [Northing, Easting] or array of points
   * @return {Array.<Number>|Array} 
   */
  transformWebMercatorToGeographic(coordinates) {
    const x = coordinates[1],
      y = coordinates[0],
      halfRadius = Math.PI * ellipsoids.SPHERE.a;

    let longitude = (y / halfRadius) * 180,
      latitude = (x / halfRadius) * 180;

    latitude = (180 / Math.PI) * (2 * Math.atan(Math.exp((latitude * Math.PI) / 180)) - Math.PI / 2);

    return [latitude, longitude];
  }
  /**
   * Converts decimal degrees to degrees, minutes and seconds
   * @public
   * @param {!Number|Array.<Number>} decimalDegrees 
   * @return {String}
   */
  ConvertDecimalDegreesToDMS(decimalDegrees) {
    if (Array.isArray(decimalDegrees)) {
      return decimalDegrees.map(dd => {
        return toDMS(dd);
      });
    } else {
      return toDMS(decimalDegrees);
    }
  }
  /**
   * Converts degrees, minutes and seconds to decimal degrees
   * @public
   * @param {!String|Array.<String>} dms 
   * @return {Number}
   */
  ConvertDMStoDecimalDegrees(dms) {
    if (Array.isArray(dms)) {
      return dms.map(d => {
        return toDMS(d);
      });
    } else {
      return toDD(dms);
    }
  }
}
