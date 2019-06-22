'use strict';

export default class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /* We have to use a tangent function to actually calculate 
   * the contact point of the wheel on the terrain */
  yOfLine(point, x) {
    /* y - y1 = m(x - x1)
    -> y1 = y - m(x - x1) */
    let m = (point.y - this.y) / (point.x - this.x);
    let y = this.y - m * (this.x - x); 
    return y;
  }

  /* Get the mid point between two other points */
  midPoint(point) {
    let m = (point.y - this.y) / (point.x - this.x);
    let x = point.x - ((point.x - this.x) / 2);
    let y = this.yOfLine(point, x);
    return new Point(x, y);
  }

  /* Get the angle (in radians) between a horizontal line and
   * a line going from p1 to p2 */
  getRotation(p2) {
    return Math.tan((p2.y - this.y) / (p2.x - this.x));
  }
}