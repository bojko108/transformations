import { toDMS, toDD } from '../common/helpers';

/**
 * Converts decimal degrees to degrees, minutes and seconds
 * @public
 * @param {!Number|Array.<Number>} decimalDegrees
 * @return {String}
 */
export const convertDecimalDegreesToDMS = function(decimalDegrees) {
  if (Array.isArray(decimalDegrees)) {
    return decimalDegrees.map(dd => {
      return toDMS(dd);
    });
  } else {
    return toDMS(decimalDegrees);
  }
};
/**
 * Converts degrees, minutes and seconds to decimal degrees
 * @public
 * @param {!String|Array.<String>} dms
 * @return {Number}
 */
export const convertDMStoDecimalDegrees = function(dms) {
  if (Array.isArray(dms)) {
    return dms.map(d => {
      return toDMS(d);
    });
  } else {
    return toDD(dms);
  }
};
