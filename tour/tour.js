'use strict';

import Point from './Point.js';

const canvas = window.document.getElementById('tour-game');

const MAX_POINTS = 64;
const center_x = canvas.width / 2;
const center_y = canvas.height / 2;
const line_len = 300;
let angle = 0;
let points = new Array();
const START_HEIGHT = canvas.height - 100; 
/* The distance by which the points move across the screen. */
const DELTA_X = 10;
/* The minimum distance between 2 points */
const DELTA_X_MIN = 10;
/* The maximum distance between 2 points */
const DELTA_X_MAX = 100;
/* The distance by which the points may vary in the Y axis. */
const DELTA_MAX_Y = 10;
/* The minimum height to which the terrain can fall */
const MIN_Y = canvas.height - 20;
/* The maximum height to which the terrain can extend */
const MAX_Y = 200;
/* Height at which the ground starts */
const START_Y = canvas.height - 50;
const END_Y = canvas.height;

/* Where bike appears on the track */
var bikeCenter = canvas.width / 2;
/* offset of wheels */
var wheelBase = 25;
/* Length of bike frame */
var frameSize = 20;
/* Height of frame off wheels.  This is when the bottom tip of the frame
 * triangle extends above the wheel contacts. */
var BBRise = 5;
/* height of bike */
var bikeStack = 15;
/* Diameter of the wheels */
var wheelDiameter = 30;

function getWheelHeight(wheelXPosition) {
  /* Where is the center of the wheel? */
  let secondPointIndex = points.findIndex(function (point) {
    return point.x > wheelXPosition;
  })
  let firstPointIndex = secondPointIndex - 1;
  let firstPoint = points[firstPointIndex];
  let terrainHeight = firstPoint.yOfLine(points[secondPointIndex], wheelXPosition);
  return terrainHeight - (wheelDiameter / 2);
}

function drawWheel(wheel) {
  ctx.fillStyle = "white";
  ctx.beginPath(wheel.x, wheel.y);
  ctx.arc(wheel.x, wheel.y, wheelDiameter / 2, 0, 360);
  ctx.fill();
}

function drawFrame(fhp, rhp) {
  ctx.fillStyle = "black";
  let bb = rhp.midPoint(fhp);
  ctx.beginPath(bb.x, bb.y);
  /* rhp.yOfLine(fhp, (rhp.x - fhp.x) / 2) */
  ctx.arc(bb.x, bb.y, 10, 0, 360);
  ctx.fill();
}

function drawBike() {
  ctx.fillStyle = "black";
  let frontWheelX = bikeCenter + wheelBase;
  let frontHubPoint = new Point(frontWheelX, getWheelHeight(frontWheelX));
  drawWheel(frontHubPoint);
  let rearWheelX = bikeCenter - wheelBase;
  let rearHubPoint = new Point(rearWheelX, getWheelHeight(rearWheelX));
  drawWheel(rearHubPoint);
  drawFrame(frontHubPoint, rearHubPoint);
}

const ctx = canvas.getContext('2d');

initPoints();
window.setInterval(draw, 100);

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

function drawGround(drawablePoints) {
  ctx.fillStyle = "rgb(99, 72, 61)";
  ctx.beginPath();
  /* start drawing from the first point (offscreen) */
  ctx.moveTo(drawablePoints[0].x, drawablePoints[0].y);
  drawablePoints.slice(1).forEach(function(point) {
    ctx.lineTo(point.x, point.y);
  });
  /* Draw line to bottom of the screen so we can fill a connected shape */
  ctx.lineTo(canvas.width, END_Y);
  /* Draw over from the bottom right to the bottom left */
  ctx.lineTo(0, END_Y);
  ctx.closePath();
  ctx.fill();
}

/* Move points over by some delta on the x axis.
 * Returns a new list of points. */
function movePoints(points) {
  return points.map(
    function(point) { 
      return new Point(point.x - DELTA_X, point.y) 
    }
  );
}

function generateNewPoint(prevPoint) {
  let deltaX = (Math.random() * DELTA_X_MAX) + DELTA_X_MIN;
  let deltaY = (Math.random() * DELTA_MAX_Y*2) - DELTA_MAX_Y;
  /* Cut off the y value between the minimum and maximum allowed */
  let y = Math.min(Math.max(prevPoint.y + deltaY, MAX_Y), MIN_Y);
  return new Point(canvas.width + deltaX, y);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function draw() {
  clearCanvas();
  drawBackground();
  drawGround(points);
  drawBike();
  points = movePoints(points);
  
  /* If the second point is off the screen, delete the first. */
  if (points[1].x < 0) {
    points.shift();
  }
  /* If the last point is now fully in the window, create a new one
   * off the right side of the screen. */
  let lastPoint = points.slice(-1)[0];
  if (lastPoint.x < canvas.width) {
    points.push(generateNewPoint(lastPoint));
  }
}


