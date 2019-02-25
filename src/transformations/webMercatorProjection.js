import { SPHERE } from '../constants/ellipsoids';

/**
 * Transforms geographic coordinates to projected in WebMercator. You can pass single point or
 * array of points.
 * @public
 * @param {!Array.<Number>|Array} coordinates - coordinates in [Latitude, Longitude] or array of points
 * @return {Array.<Number>|Array}
 */
export const transformGeographicToWebMercator = function(coordinates) {
  const latitude = coordinates[0],
    longitude = coordinates[1],
    halfRadius = Math.PI * SPHERE.a;

  let x = (longitude * halfRadius) / 180,
    y = Math.log(Math.tan(((90 + latitude) * Math.PI) / 360)) / (Math.PI / 180);

  y = (y * halfRadius) / 180;

  return [x, y];
};
/**
 * Transforms projected coordinates in WebMercator to geographic. You can pass single point or
 * array of points.
 * @public
 * @param {!Array.<Number>|Array} coordinates - coordinates in [Northing, Easting] or array of points
 * @return {Array.<Number>|Array}
 */
export const transformWebMercatorToGeographic = function(coordinates) {
  const x = coordinates[1],
    y = coordinates[0],
    halfRadius = Math.PI * SPHERE.a;

  let longitude = (y / halfRadius) * 180,
    latitude = (x / halfRadius) * 180;

  latitude = (180 / Math.PI) * (2 * Math.atan(Math.exp((latitude * Math.PI) / 180)) - Math.PI / 2);

  return [latitude, longitude];
};
