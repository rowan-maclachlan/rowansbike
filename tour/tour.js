'use strict';

import Point from './Point';

const canvas = window.document.getElementById('tour-game');

const MAX_POINTS = 64;
const center_x = canvas.width / 2;
const center_y = canvas.height / 2;
const line_len = 300;
let angle = 0;
let points = new Array();
const START_HEIGHT = canvas.height - 100; 
/* The distance by which the points move at a time. */
const DELTA_X = 10;
/* The distance by which the points may vary in the Y axis. */
const DELTA_MAX_Y = 5;
/* The maximum height to which the terrain can extend */
const MAX_Y = 100;
/* Height at which the ground starts */
const START_Y = canvas.height - 100;
/* The minimum height to which the terrain can fall */
const MIN_Y = 0;
points[0] = new Point(START_HEIGHT, 0);
points[1] = new Point(START_HEIGHT, canvas.width);

const ctx = canvas.getContext('2d');

initPoints();
window.setInterval(draw, 1);

function initPoints() {
  points.push(new Point(0, START_Y));
  points.push(new Point(canvas.width, START_Y));
}

function drawSun() {
  ctx.beginPath();
  ctx.fillStyle = "yellow";
  ctx.arc(canvas.width - 100, 200, 50, 0, 2 * Math.PI);
  ctx.fill();
}

function drawBackMountains() {
  ctx.beginPath();
  ctx.fillStyle = "rgba(173, 157, 173, 0.5)";
  ctx.moveTo(0, canvas.height);
  ctx.lineTo(0, canvas.height - 120);
  ctx.lineTo(120, canvas.height - 165);
  ctx.lineTo(155, canvas.height - 150);
  ctx.lineTo(265, canvas.height - 220);
  ctx.lineTo(345, canvas.height - 160);
  ctx.lineTo(410, canvas.height - 180);
  ctx.lineTo(475, canvas.height - 150);
  ctx.lineTo(575, canvas.height - 160);
  ctx.lineTo(630, canvas.height - 150);
  ctx.lineTo(canvas.width, canvas.height - 125);
  ctx.lineTo(canvas.width, canvas.height);
  ctx.closePath();
  ctx.fill();
}

function drawForeMountains() {
  ctx.fillStyle = "rgba(90, 96, 90, 0.8)";
  ctx.beginPath();
  ctx.moveTo(0, canvas.height);
  ctx.lineTo(0, canvas.height - 100);
  ctx.lineTo(100, canvas.height - 140);
  ctx.lineTo(150, canvas.height - 120);
  ctx.lineTo(225, canvas.height - 180);
  ctx.lineTo(325, canvas.height - 150);
  ctx.lineTo(400, canvas.height - 170);
  ctx.lineTo(500, canvas.height - 125);
  ctx.lineTo(600, canvas.height - 145);
  ctx.lineTo(canvas.width, canvas.height - 110);
  ctx.lineTo(canvas.width, canvas.height);
  ctx.closePath();
  ctx.fill();
}

function drawBackground() {
  drawSun();
  drawBackMountains();
  drawForeMountains();
}

function getDrawablePoints(points) {
  drawablePoints = points.filter(p => p.x < canvas.width);
    /* Get the first point off the right side of the screen */
  lastPoint = points[points.indexOf(drawablePoints.slice(-1)[0])];
  if (typeof lastPoint === 'undefined') {
    lastPoint = new Point(canvas.width, )
  }
  return drawablePoints.push(lastPoint);
}

function drawGround(drawablePoints) {
  ctx.fillStyle = "brown";
  ctx.beginPath();
  /* start drawing from the first point (offscreen) */
  ctx.moveTo(drawablePoints[0].x, drawablePoints[0].y);
  for (var p in drawable_points) {
    ctx.lineTo(p.x, p.y);
  }
  ctx.lineTo(last_p.x, last_p.y);
  /* Draw line to bottom of the screen so we can fill a connected shape */
  ctx.lineTo(last_p.x, canvas.height);
  ctx.closePath();
  ctx.fill();
}

/* Move points over by some delta on the x axis.
 * Returns a new list of points. */
function movePoints(points) {
  return points.map(p => p.x -= DELTA_X);
}

function generateNewPoint(prevPoint) {
  let deltaY = (Math.random() * DELTA_MAX_Y*2) - DELTA_MAX_Y;
  return new Point(canvas.width, deltaY + prevPoint.y);
}

function adjustPoints(points) {
  /* If the second point is off the screen, delete the first. */
  if (points[1].x < 0) {
    points.shift();
  }
  /* If the last point is now fully in the window, create a new one
   * off the right side of the screen. */
  if (points.slice[-1].x < canvas.width) {
    points.push(generateNewPoint(points.slice[-1]));
  }
}

function draw() {
  drawBackground();
  drawGround(getDrawablePoints(points));
  points = movePoints(points);
  adjustPoints(points);
}


