'use strict';

import Point from './Point.js';

/* Background canvas.  Only contains permenant renderings */
const BACKGROUND = window.document.getElementById('background');
/* Mid-level canvas.  Renders terrain and bike and other moving elements */
const TERRAIN = window.document.getElementById('terrain');
/* Top level canvas.  Only renders UI elements */
const UI = window.document.getElementById('ui');

/* canvas width */
const WIDTH = BACKGROUND.width;
/* canvas height */
const HEIGHT = BACKGROUND.height;
/* canvas center point on the x axis */
const CENTER_X = BACKGROUND.width / 2;
/* canvas center point on the y axis */
const CENTER_Y = BACKGROUND.height / 2;
/* Holds points used to draw the ground */
let points = new Array();
/* Holds the points used to draw the moving background */
let backgroundPoints = new Array();
/* Holds the points that define cloud positions.  A cloud is defined by two points - top left and bottom right */
let clouds = new Array();
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
/* The distance by which the clouds move across the screen per tick */
const DELTA_X_CLOUDS = 1;
/* The maximum distance between 2 clouds */
const DELTA_X_CLOUDS_MAX = 500;
/* The minimum distance between 2 clouds */
const DELTA_X_CLOUDS_MIN = 200;
/* The height of a cloud */
const CLOUD_HEIGHT = 40;
/* The minimum height at which point a cloud may appear */
const CLOUD_FLOOR = 150;
/* The minimum length of a cloud */
const CLOUD_LENGTH_MIN = 50;
/* The maximum length of a cloud */
const CLOUD_LENGTH_MAX = 150;
/* The minimum height to which the ground can fall */
const MIN_Y = BACKGROUND.height - 20;
/* The maximum height to which the ground can extend */
const MAX_Y = 200;
/* The minimum height to which the background can fall */
const MIN_Y_BACKGROUND = BACKGROUND.height - 100;
/* The maximum height to which the background can extend */
const MAX_Y_BACKGROUND = 200;
/* Height at which the ground starts */
const START_Y = BACKGROUND.height - 50;
/* What depth to extends when drawing the shape of the ground */
const END_Y = BACKGROUND.height;
/* What is the current RPM of the bike? */
let rpm = 0;
/* Current front gear of the bike */
let currFrontGear = 1;
/* Current rear gear of the bike */
let currRearGear = 1;
/* The gearings of the front chainrings */
const FRONT_GEARS = new Array(30, 39, 50);
/* Front gear range */
const FRONT_GEAR_RANGE = FRONT_GEARS.length;
/* The gearings of the rear sprockets */
const REAR_GEARS = new Array(28, 25, 22, 20, 18, 16, 14, 12);
/* Rear gear range */
const REAR_GEAR_RANGE = REAR_GEARS.length;
/* Constant wattage of the rider. */
const WATTAGE = 200;
/* Drag of rider and bike */
const CDA = 0.4;
/* Weight of rider and bike - kilograms */
const WEIGHT = 80;
/* Wheels and tyre radius - metres */
const TYRE_RADIUS = 0.339; /* A 700c w/ 28mm tyres */
/* crank arm length of the crankset - millimeters */
const CRANK_ARM_LENGTH = 172.5;


/* Where bike appears on the track */
var bikeCenter = BACKGROUND.width / 2;
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

const BACKGROUND_CTX = BACKGROUND.getContext('2d');
const TERRAIN_CTX = TERRAIN.getContext('2d');
const UI_CTX = UI.getContext('2d');

initPoints();
drawBackground(BACKGROUND_CTX);
window.setInterval(draw, 50);

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

function drawWheel(ctx, wheel) {
  ctx.fillStyle = "white";
  ctx.beginPath(wheel.x, wheel.y);
  ctx.arc(wheel.x, wheel.y, wheelDiameter / 2, 0, 360);
  ctx.fill();
}

function drawFrame(ctx, fhp, rhp) {
  ctx.save();
  ctx.fillStyle = "black";
  let bb = rhp.midPoint(fhp);
  /* translate to bb center */
  ctx.translate(bb.x, bb.y);
  /* rotate around bb center */
  let radians = bb.getRotation(fhp);
  ctx.rotate(radians);
  ctx.beginPath(0, 0 + BBDrop);
  ctx.lineTo((frameSize / 2), -bikeStack);
  ctx.lineTo(-(frameSize / 2), -bikeStack);
  ctx.lineTo(0, BBDrop);
  ctx.closePath();
  ctx.fill();
  /* Draw handlebars */
  ctx.lineWidth = 4;
  ctx.moveTo((frameSize / 2), -bikeStack + 2);
  ctx.beginPath();
  ctx.lineTo((frameSize / 2) - 5, -bikeStack + 2);
  ctx.arc((frameSize / 2), -bikeStack + 5 + 2,
          5,
          1.5 * Math.PI,
          0.5 * Math.PI,
          false);
  ctx.stroke();
  ctx.restore();
}

function drawBike(ctx) {
  let frontWheelX = bikeCenter + wheelBase;
  let frontHubPoint = new Point(frontWheelX, getWheelHeight(frontWheelX));
  drawWheel(ctx, frontHubPoint);
  let rearWheelX = bikeCenter - wheelBase;
  let rearHubPoint = new Point(rearWheelX, getWheelHeight(rearWheelX));
  drawWheel(ctx, rearHubPoint);
  drawFrame(ctx, frontHubPoint, rearHubPoint);
  /* TODO drawSeat(); */
}

/* Set up the initial points drawn for the ground as well as the moving 
 * background. */
function initPoints() {
  points.push(new Point(0, START_Y));
  points.push(new Point(WIDTH, START_Y));
  backgroundPoints.push(new Point(0, START_Y));
  let newPoint = generateNewPoint(
      backgroundPoints[0], 
      DELTA_X_MAX_BACKGROUND, 
      DELTA_X_MIN_BACKGROUND, 
      DELTA_Y_MAX_BACKGROUND);
  backgroundPoints.push(newPoint);
  
  let cloudTopLeft = new Point(
      (WIDTH + Math.max((Math.random() * DELTA_X_CLOUDS_MAX), DELTA_X_CLOUDS_MIN)),
      (Math.random() * CLOUD_FLOOR));
  let cloudBottomRight = new Point(
      (cloudTopLeft.x + Math.max(CLOUD_LENGTH_MIN, Math.random() * CLOUD_LENGTH_MAX)),
      (cloudTopLeft.y + CLOUD_HEIGHT));
  clouds.push(cloudTopLeft);
  clouds.push(cloudBottomRight);
}

function drawSun(ctx) {
  ctx.beginPath();
  ctx.fillStyle = "yellow";
  ctx.arc(WIDTH - 100, 200, 50, 0, 2 * Math.PI);
  ctx.fill();
  
  /* Gradient clouds from pink at the bottom to white */
  let sunGradient = ctx.createLinearGradient(0, 210, 0, 220);
  sunGradient.addColorStop(0, "orange");
  sunGradient.addColorStop(1, "pink");
  ctx.fillStyle = sunGradient;
  ctx.fillRect(WIDTH - 175, 210, 110, 10);
  
  sunGradient = ctx.createLinearGradient(0, 230, 0, 236);
  sunGradient.addColorStop(0, "orange");
  sunGradient.addColorStop(1, "pink");
  ctx.fillStyle = sunGradient;
  ctx.fillRect(WIDTH - 175, 230, 85, 6);
}

function drawBackMountains(ctx) {
  ctx.beginPath();
  ctx.fillStyle = "rgba(173, 157, 173, 0.5)";
  ctx.moveTo(0, HEIGHT);
  ctx.lineTo(0, HEIGHT - 120);
  ctx.lineTo(120, HEIGHT - 165);
  ctx.lineTo(155, HEIGHT - 150);
  ctx.lineTo(265, HEIGHT - 220);
  ctx.lineTo(345, HEIGHT - 160);
  ctx.lineTo(410, HEIGHT - 180);
  ctx.lineTo(475, HEIGHT - 150);
  ctx.lineTo(575, HEIGHT - 160);
  ctx.lineTo(630, HEIGHT - 150);
  ctx.lineTo(WIDTH, HEIGHT - 125);
  ctx.lineTo(WIDTH, HEIGHT);
  ctx.closePath();
  ctx.fill();
}

function drawMidMountains(ctx) {
  ctx.fillStyle = "rgba(90, 96, 90, 0.75)";
  ctx.beginPath();
  ctx.moveTo(0, HEIGHT);
  ctx.lineTo(0, HEIGHT - 100);
  ctx.lineTo(100, HEIGHT - 140);
  ctx.lineTo(150, HEIGHT - 120);
  ctx.lineTo(225, HEIGHT - 180);
  ctx.lineTo(325, HEIGHT - 150);
  ctx.lineTo(400, HEIGHT - 170);
  ctx.lineTo(500, HEIGHT - 125);
  ctx.lineTo(600, HEIGHT - 145);
  ctx.lineTo(WIDTH, HEIGHT - 110);
  ctx.lineTo(WIDTH, HEIGHT);
  ctx.closePath();
  ctx.fill();
}

function drawForeMountains(ctx) {
  ctx.fillStyle = "rgba(64, 71, 64, 0.9)";
  ctx.beginPath();
  ctx.moveTo(0, HEIGHT);
  ctx.lineTo(0, HEIGHT - 90);
  ctx.lineTo(90, HEIGHT - 110);
  ctx.lineTo(130, HEIGHT - 95);
  ctx.lineTo(195, HEIGHT - 140);
  ctx.lineTo(255, HEIGHT - 110);
  ctx.lineTo(425, HEIGHT - 120);
  ctx.lineTo(WIDTH, HEIGHT - 90);
  ctx.lineTo(WIDTH, HEIGHT);
  ctx.closePath();
  ctx.fill();
}

function drawBackground(ctx) {
  drawSun(ctx);
  drawBackMountains(ctx);
  drawMidMountains(ctx);
  drawForeMountains(ctx);
}

function drawGround(ctx, drawablePoints, colour) {
  ctx.fillStyle = colour;
  ctx.beginPath();
  /* start drawing from the first point (offscreen) */
  ctx.moveTo(drawablePoints[0].x, drawablePoints[0].y);
  drawablePoints.slice(1).forEach(function(point) {
    ctx.lineTo(point.x, point.y);
  });
  /* Draw line to bottom of the screen so we can fill a connected shape */
  ctx.lineTo(WIDTH, END_Y);
  /* Draw over from the bottom right to the bottom left */
  ctx.lineTo(0, END_Y);
  ctx.closePath();
  ctx.fill();
}

function drawClouds(ctx, drawablePoints) {
  for (let i = 0; i < drawablePoints.length; i += 2) {
    let topLeft = drawablePoints[i];
    let bottomRight = drawablePoints[i + 1];
    /* Gradient clouds from pink at the bottom to white */
    let cloudGradient = ctx.createLinearGradient(0, topLeft.y, 0, bottomRight.y);
    cloudGradient.addColorStop(0, "white");
    cloudGradient.addColorStop(1, "pink");
    ctx.fillStyle = cloudGradient;
    ctx.fillRect(topLeft.x, topLeft.y, bottomRight.x - topLeft.x, CLOUD_HEIGHT);
  }
}

/** 
 * Move points over by some delta on the x axis.
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
  return new Point(WIDTH + deltaX, y);
}

/** Clear the canvas of all drawn shapes. */
function clearCanvas(ctx) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
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
  if (lastPoint.x < WIDTH) {
    shiftPoints.push(generateNewPoint(
      lastPoint, delta_x_max, delta_x_min, delta_y_max));
  }
}

/**
 * Get a list of two points that define a cloud.  
 * @param {Point} The end position of the previous cloud needs to be provided in order
 * to determine at what position to place the next.
 * @return [Point, Point] Two points that define the position of the cloud.
 */
function getNextCloud(prevCloud) {
  let deltaX = Math.max((Math.random() * DELTA_X_CLOUDS_MAX), DELTA_X_CLOUDS_MIN);
  let cloudTopLeft = new Point(
      (deltaX + prevCloud.x),
      (Math.random() * CLOUD_FLOOR));
  let cloudBottomRight = new Point(
      (cloudTopLeft.x + Math.max(CLOUD_LENGTH_MIN, Math.random() * CLOUD_LENGTH_MAX)),
      (cloudTopLeft.y + CLOUD_HEIGHT));
  return [cloudTopLeft, cloudBottomRight];
}

/** 
 * If the points extends far enough off the left side of the canvas, shift off the
 * furthest.  If there are not enough points past the right side of the screen, generate a 
 * new one. 
 * @param {Point[]} clouds The list of Points that define the position and size of clouds 
 * on the screen.
 */
function shiftClouds(clouds) {
  /* If a whole cloud is off the screen, delete it. */
  if (clouds[1].x < 0) {
    clouds.shift();
    clouds.shift();
  }
  /* If the head end of the last cloud is within the frame, generate a new cloud. 
     If there are no clouds on the screen, generate a new one the same way */
  /* Get the front of the last cloud in the list of Points */
  let lastPoint = clouds.slice(-2)[0];
  /* If that last cloud is partially on-screen, create the next cloud */
  if (lastPoint.x < WIDTH) {
    console.log("LastPoint: " + lastPoint.x);
    let newCloud = getNextCloud(lastPoint);
    clouds.push(newCloud[0], newCloud[1]);
    console.log("Cloud is fully onscreen");
    console.log(clouds);
  }
}

/**
 * Draw the UI on the context provided.  This should display details that need
 * to be overlaid ontop of the terrain to provide the player with feedback.
 * @param {context} ctx The context for the UI to be drawn on.
 */
function drawUi(ctx) {
  ctx.font = "24px Verdana";
  ctx.fillText(rpm, WIDTH / 2, 100);
  ctx.font = "16px Verdana";
  ctx.fillText(currFrontGear, (WIDTH / 2) - 20, 75);
  ctx.fillText(currRearGear, (WIDTH / 2) + 20, 75);
}

/**
 * Calculate the gear ratio.
 * @param {int} frontTeeth The number of teeth for the front chainring.
 * @param {int} rearTeeth The number of teeth for the rear sprocket.
 * @return {int} the gear ratio.
 */
function calcGearRatio(frontTeeth, rearTeeth) {
  return frontTeeth / rearTeeth;
}

/**
 * Get the new front gear after upshifting on the front derailleur.
 * @param {int} currFrontGear The current front gearing.
 * @return {int} The new front gearing.
 */
function upFrontGear(currFrontGear) {
  return Math.min(currFrontGear + 1, FRONT_GEAR_RANGE);
}

/**
 * Get the new front gear after downshifting on the front derailleur.
 * @param {int} currFrontGear The current front gearing.
 * @return {int} The new front gearing.
 */
function downFrontGear(currFrontGear) {
  return Math.max(currFrontGear - 1, 1);
}

/**
 * Get the new rear gear after upshifting on the rear derailleur.
 * @param {int} currRearGear The current rear gearing.
 * @return {int} The new rear gearing.
 */
function upRearGear(currRearGear) {
  return Math.min(currRearGear + 1, REAR_GEAR_RANGE);
}

/**
 * Get the new rear gear after downshifting on the rear derailleur.
 * @param {int} currRearGear The current rear gearing.
 * @return {int} The new rear gearing.
 */
function downRearGear(currRearGear) {
  return Math.max(currRearGear - 1, 1);
}

/** Get the total wheel diameter factoring in wheel size and tyre size.
 * @param {int} wheelSize Total wheel diameter in millimeters.
 * @param {int} Tyre size in millimeters.
 * @return {int} Total wheel diameter.
 */
function calculateWheelCircumference(wheelSize, tireSize) {
  return Math.PI * (wheelSize + (2 * tireSize))
}

/**
 * Calculate the cadence of the rider in the provided conditions.
 */
function calcCadence(diameter, frontTeeth, rearTeeth) {
  return speed / (calculateWheelCircumference(diameter, tire_size)) * calcGearRatio(front, rear);
}

function draw() {
  clearCanvas(TERRAIN_CTX);
  drawClouds(TERRAIN_CTX, clouds);
  drawGround(TERRAIN_CTX, backgroundPoints, "rgb(44, 53, 44)");
  drawGround(TERRAIN_CTX, points, "rgb(173, 119, 83)");
  drawBike(TERRAIN_CTX);
  drawUi(UI_CTX);
  clouds = movePoints(clouds, DELTA_X_CLOUDS);
  points = movePoints(points, DELTA_X);
  backgroundPoints = movePoints(backgroundPoints, DELTA_X_BACKGROUND);
  shiftClouds(clouds);
  shiftPoints(points, 
              DELTA_X_MAX, 
              DELTA_X_MIN, 
              DELTA_Y_MAX);
  shiftPoints(backgroundPoints, 
              DELTA_X_MAX_BACKGROUND, 
              DELTA_X_MIN_BACKGROUND, 
              DELTA_Y_MAX_BACKGROUND);
}