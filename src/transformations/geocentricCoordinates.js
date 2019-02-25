import {  WGS84 } from '../constants/ellipsoids';
import { toRad, toDeg } from '../common/helpers';

/**
 * Transforms geographic coordinates to geocentric. You can pass single point or
 * array of points.
 * @public
 * @param {!Array.<Number>|Array} coordinates - coordinates in [Latitude, Longitude] or array of points
 * @param {Object.<String,*>} [outputEllipsoid=WGS84] - output ellipsoid
 * @return {Array.<Number>|Array}
 */
export const transformGeographicToGeocentric = function(coordinates, outputEllipsoid = WGS84) {
  const latitude = toRad(coordinates[0]),
    longitude = toRad(coordinates[1]),
    h = coordinates[2] || 0.0,
    N =
      Math.pow(outputEllipsoid.a, 2) /
      Math.sqrt(Math.pow(outputEllipsoid.a, 2) * Math.pow(Math.cos(latitude), 2) + Math.pow(outputEllipsoid.b, 2) * Math.pow(Math.sin(latitude), 2));

  let X = (N + h) * Math.cos(latitude) * Math.cos(longitude),
    Y = (N + h) * Math.cos(latitude) * Math.sin(longitude),
    Z = ((Math.pow(outputEllipsoid.b, 2) / Math.pow(outputEllipsoid.a, 2)) * N + h) * Math.sin(latitude);

  return [X, Y, Z];
};
/**
 * Transforms geocentric geographic coordinates. You can pass single point or
 * array of points.
 * @public
 * @param {!Array.<Number>|Array} coordinates - coordinates in [X, Y, Z] or array of points
 * @param {Object.<String,*>} [inputEllipsoid=WGS84] - input ellipsoid
 * @return {Array.<Number>|Array}
 */
export const transformGeocentricToGeographic = function(coordinates, inputEllipsoid = WGS84) {
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
};
