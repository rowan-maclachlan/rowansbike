'use strict';

import Point from './Point.js';

const canvas = window.document.getElementById('tour-game');

const center_x = canvas.width / 2;
const center_y = canvas.height / 2;
const line_len = 300;
let angle = 0;
/* Holds points used to draw the ground */
let points = new Array();
/* Holds the points used to draw the moving background */
let backgroundPoints = new Array();
/* The distance by which the points move across the screen. */
const DELTA_X = 5;
/* The distance by which the background points move across the screen */
const DELTA_X_BACKGROUND = 2;
/* The minimum distance between 2 points */
const DELTA_X_MIN = 10;
/* The maximum distance between 2 points */
const DELTA_X_MAX = 100;
/* The distance by which the points may vary in the Y axis. */
const DELTA_Y_MAX = 10;
/* The minimum distance between two background points */
const DELTA_X_MIN_BACKGROUND = 50;
/* The maximum distance between 2 background points */
const DELTA_X_MAX_BACKGROUND = 150;
/* The maximum height by which the background points vary */
const DELTA_Y_MAX_BACKGROUND = 50;
/* The minimum height to which the ground can fall */
const MIN_Y = canvas.height - 20;
/* The maximum height to which the ground can extend */
const MAX_Y = 200;
/* The minimum height to which the background can fall */
const MIN_Y_BACKGROUND = canvas.height - 100;
/* The maximum height to which the background can extend */
const MAX_Y_BACKGROUND = 200;
/* Height at which the ground starts */
const START_Y = canvas.height - 50;
/* What depth to extends when drawing the shape of the ground */
const END_Y = canvas.height;

/* Where bike appears on the track */
var bikeCenter = canvas.width / 2;
/* offset of wheels */
var wheelBase = 25;
/* Length of bike frame */
var frameSize = 45;
/* Height of frame off wheels.  This is the distance that the bottom point of the bike is above the 
 * line between the two wheel hubs. */
var BBDrop = 10;
/* height of bike */
var bikeStack = 25;
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

const ctx = canvas.getContext('2d');

initPoints();
window.setInterval(draw, 50);

function drawWheel(wheel) {
  ctx.fillStyle = "white";
  ctx.beginPath(wheel.x, wheel.y);
  ctx.arc(wheel.x, wheel.y, wheelDiameter / 2, 0, 360);
  ctx.fill();
}

function drawFrame(fhp, rhp) {
  ctx.save();
  ctx.fillStyle = "black";
  let bb = rhp.midPoint(fhp);
  /* translate to bb center */
  ctx.translate(bb.x, bb.y);
  /* rotate around bb center */
  let radians = bb.getRotation(fhp);
  ctx.rotate(radians);
  ctx.beginPath(0, 0 + BBDrop);
  ctx.lineTo(0 + (frameSize / 2), 0 - bikeStack);
  ctx.lineTo(0 - (frameSize / 2), 0 - bikeStack);
  ctx.lineTo(0, 0 + BBDrop);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  ctx.restore();
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
  /* TODO drawHandlebars(); */
  /* TODO drawSeat(); */
}

/* Set up the initial points drawn for the ground as well as the moving 
 * background. */
function initPoints() {
  points.push(new Point(0, START_Y));
  points.push(new Point(canvas.width, START_Y));
  backgroundPoints.push(new Point(0, START_Y));
  let newPoint = generateNewPoint(
      backgroundPoints[0], 
      DELTA_X_MAX_BACKGROUND, 
      DELTA_X_MIN_BACKGROUND, 
      DELTA_Y_MAX_BACKGROUND);
  backgroundPoints.push(newPoint);
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

function drawGround(drawablePoints, colour) {
  ctx.fillStyle = colour;
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
function movePoints(points, delta_x) {
  return points.map(
    function(point) { 
      return new Point(point.x - delta_x, point.y) 
    }
  );
}

/** Generate a new point.
 *
 * @param {Point} prevPoint The point to vary from.
 * @param {int} delta_x_max The maximum value by which the new point may vary in the x axis.
 * @param {int} delta_x_min The minimum value by which the new point may vary in the x axis.
 * @param {int} delta_y_max The maximum value by which a new point may vary in the y axis.
 *
 * @return {Point} A pseudo-randomly generated point.
 */
function generateNewPoint(prevPoint, delta_x_max, delta_x_min, delta_y_max) {
  let deltaX = (Math.random() * delta_x_max) + delta_x_min;
  let deltaY = (Math.random() * delta_y_max*2) - delta_y_max;
  /* Cut off the y value between the minimum and maximum allowed */
  let y = Math.min(Math.max(prevPoint.y + deltaY, MAX_Y), MIN_Y);
  return new Point(canvas.width + deltaX, y);
}

/* Clear the canvas of all drawn shapes. */
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/* If the points extends far enough off the left side of the canvas, shift off the
 * furthest.  If there are not enough points past the right side of the screen, generate a 
 * new one. */
function shiftPoints(shiftPoints, delta_x_max, delta_x_min, delta_y_max) {
  /* If the second point is off the screen, delete the first. */
  if (shiftPoints[1].x < 0) {
    shiftPoints.shift();
  }
  /* If the last point is now fully in the window, create a new one
   * off the right side of the screen. */
  let lastPoint = shiftPoints.slice(-1)[0];
  if (lastPoint.x < canvas.width) {
    shiftPoints.push(generateNewPoint(
      lastPoint, delta_x_max, delta_x_min, delta_y_max));
  }
}

function draw() {
  clearCanvas();
  drawBackground();
  drawGround(backgroundPoints, "rgb(67, 79, 67)");
  drawGround(points, "rgb(99, 78, 72)");
  drawBike();
  points = movePoints(points, DELTA_X);
  backgroundPoints = movePoints(backgroundPoints, DELTA_X_BACKGROUND);
  shiftPoints(points, 
              DELTA_X_MAX, 
              DELTA_X_MIN, 
              DELTA_Y_MAX);
  shiftPoints(backgroundPoints, 
              DELTA_X_MAX_BACKGROUND, 
              DELTA_X_MIN_BACKGROUND, 
              DELTA_Y_MAX_BACKGROUND);
}


