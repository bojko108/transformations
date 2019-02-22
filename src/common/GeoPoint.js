/**
 * Represents a 2D point
 */
export default class GeoPoint {
  constructor(x = 0.0, y = 0.0, z = 0.0, id = -1) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.z = z;
  }

  toPoint() {
    return { x: Math.round(this.x), y: Math.round(this.y), data: this };
  }
}
