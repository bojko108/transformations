import * as ellipsoids from './constants/ellipsoids.js';
import * as projections from './constants/projections.js';
import {
  BGSCoordinates,
  transformGeographicToLambert,
  transformLambertToGeographic,
  transformGeographicToUTM,
  transformUTMToGeographic,
  transformGeographicToGauss,
  transformGaussToGeographic,
  transformGeographicToGeocentric,
  transformGeocentricToGeographic,
  transformGeographicToWebMercator,
  transformWebMercatorToGeographic,
  convertDecimalDegreesToDMS,
  convertDMStoDecimalDegrees
} from './transformations/index.js';

export { ellipsoids, projections };
export {
  BGSCoordinates,
  transformGeographicToLambert,
  transformLambertToGeographic,
  transformGeographicToUTM,
  transformUTMToGeographic,
  transformGeographicToGauss,
  transformGaussToGeographic,
  transformGeographicToGeocentric,
  transformGeocentricToGeographic,
  transformGeographicToWebMercator,
  transformWebMercatorToGeographic,
  convertDecimalDegreesToDMS,
  convertDMStoDecimalDegrees
};
