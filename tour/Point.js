'use strict';

export default class Point {

  x = 0;
  y = 0;

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
}