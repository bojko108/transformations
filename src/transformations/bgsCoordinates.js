import * as projections from '../constants/projections.js';
import { getOrLoadGrid } from '../grids/index.js';

/**
 * Class for transforming coordinates between BGS coordinate systems. 
 * Transformations are performed by calculating shift parameters 
 * using precomputed grids.  
 */
export class BGSCoordinates {
  /**
   * Transforms from BGS 1930, BGS1950, BGS Sofia, BGS 1970 or BGS 2005 projected coordinates to the specified projection.
   * @public
   * @param {!Array.<Number>} inputPoint - coordinates in [Northing, Easting]
   * @param {String|Object.<String,*>} [inputProjection=projections.BGS_1970_K9] - input point is in this projection
   * @param {String|Object.<String,*>} [outputProjection=projections.BGS_2005_KK] - result point projection
   * @return {Array.<Number>}
   * @throws {Error} if grid is not found
   */
  transform(
    inputPoint,
    inputProjection = projections.BGS_1970_K9,
    outputProjection = projections.BGS_2005_KK) {

    const sourceProjection = this._resolveProjection(inputProjection);
    const targetProjection = this._resolveProjection(outputProjection);

    const grid = getOrLoadGrid(sourceProjection.name, targetProjection.name);
    if (!grid) {
      throw new Error(`Grid transformation from ${sourceProjection.name} to ${targetProjection.name} not found.`);
    }

    const { x, y } = grid.extract({ x: inputPoint[1], y: inputPoint[0] });

    return [y, x];
  }

  /**
  * Transforms from BGS 1930, BGS1950, BGS Sofia, BGS 1970 or BGS 2005 projected coordinates to the specified projection.
  * @public
  * @param {!Array.<Number>} inputPoints - coordinates in [Northing, Easting]
  * @param {String|Object.<String,*>} [inputProjection=projections.BGS_1970_K9] - input point is in this projection
  * @param {String|Object.<String,*>} [outputProjection=projections.BGS_2005_KK] - result point projection
  * @return {Array.<Array.<Number>>}
  * @throws {Error} if grid is not found
  */
  transformArray(
    inputPoints,
    inputProjection = projections.BGS_1970_K9,
    outputProjection = projections.BGS_2005_KK
  ) {
    const sourceProjection = this._resolveProjection(inputProjection);
    const targetProjection = this._resolveProjection(outputProjection);

    const grid = getOrLoadGrid(sourceProjection.name, targetProjection.name);
    if (!grid) {
      throw new Error(`Grid transformation from ${sourceProjection.name} to ${targetProjection.name} not found.`);
    }

    let result = inputPoints.map(point => {
      const { x, y } = grid.extract({ x: point[1], y: point[0] });
      return [y, x];
    });

    return result;
  }

  _resolveProjection(projection) {
    if (typeof projection === 'object' && projection !== null) {
      return projection;
    }

    if (typeof projection === 'string') {
      const resolved = projections[projection];
    
      if (!resolved) {
        throw new Error(`Projection "${projection}" not found.`);
      }
    
      return resolved;
    }

    throw new Error(`Invalid projection parameter: ${projection}`);
  }
}