import KDBush from 'kdbush';

export default class ControlPointsClass {
  constructor() {
    this._tree = {};
    this._points = [];
  }

  // var format=function(features){features.forEach(p=>{console.log(`{id:${new Number(p.properties.nid)}, x:${new Number(p.geometry.coordinates[1])}, y: ${new Number(p.geometry.coordinates[0])}},`)});}
  initTree() {
    this._tree = new KDBush(this._points, p => Math.round(p.x), p => Math.round(p.y), 64, Int32Array);
  }

  getPointById(id) {
    return this.getPointsById([id]);
  }

  getPointsById(ids) {
    return this._sort(this._points.filter(p => ids.includes(p.id)), 'id');
  }

  getPointsWithin(point, radius) {
    return this._sort(this._tree.within(point[0], point[1], radius).map(id => this._points[id]), 'id');
  }

  getPointsInExtent(extent) {
    return this._sort(this._tree.range(extent[0], extent[1], extent[2], extent[3]).map(id => this._points[id]), 'id');
  }

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
