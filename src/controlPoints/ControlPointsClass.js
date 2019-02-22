import KDBush from 'kdbush';
/**
 * Base class for holding information for all contriol points in a specific BGS projection
 * @private
 * @extends {ControlPointsClass}
 */
export default class ControlPointsClass {
  constructor() {
    this._tree = {};
    this._points = [];
  }
  /**
   * Initializes the KD tree
   */
  initTree() {
    // var format=function(features){features.forEach(p=>{console.log(`{id:${new Number(p.properties.nid)}, x:${new Number(p.geometry.coordinates[1])}, y: ${new Number(p.geometry.coordinates[0])}},`)});}
    this._tree = new KDBush(this._points, p => Math.round(p.x), p => Math.round(p.y), 64, Int32Array);
  }
  /**
   * Get a point from the spatial index by ID
   * @param {!Number} id
   * @return {Object.<String,*>}
   */
  getPointById(id) {
    return this.getPointsById([id]);
  }
  /**
   * Get an array of points from the spatial index by ID
   * @param {!Array.<Number>} ids
   * @return {Array.<Object>}
   */
  getPointsById(ids) {
    return this._sort(this._points.filter(p => ids.includes(p.id)), 'id');
  }
  /**
   * Get an array of points from the spatial index which are at distance `radius` from `point`
   * @param {!Array.<Number>} point - coordinates in [Northing, Easting]
   * @param {!Number} radius - search radius in meters
   * @return {Array.<Object>}
   */
  getPointsWithin(point, radius) {
    return this._sort(this._tree.within(point[0], point[1], radius).map(id => this._points[id]), 'id');
  }
  /**
   * Get an array of points from the spatial index which are inside `extent`
   * @param {!Array.<Number>} extent - coordinates in [minx, miny, maxx, maxy]
   * @param {!Number} radius - search radius in meters
   * @return {Array.<Object>}
   */
  getPointsInExtent(extent) {
    return this._sort(this._tree.range(extent[0], extent[1], extent[2], extent[3]).map(id => this._points[id]), 'id');
  }
  /**
   * Sorts an array of objects based on `field`
   * @private
   * @param {!Array} array 
   * @param {!String} field
   * @return {Array} sorted array 
   */
  _sort(array, field) {
    return array.sort((a, b) => {
      if (a[field] < b[field]) {
        return -1;
      }
      if (a[field] > b[field]) {
        return 1;
      }
      return 0;
    });
  }
}
