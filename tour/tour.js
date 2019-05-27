import Point from 'Points.js';

const canvas = window.document.getElementById('tour-game');

const MAX_POINTS = 64;
const center_x = canvas.width / 2;
const center_y = canvas.height / 2;
const line_len = 300;
let angle = 0;
let points = new Array(MAX_POINTS);
const START_HEIGHT = canvas.height - 100; 
/* The distance by which the points move at a time. */
const DELTA = 10;
points[0] = new Point(START_HEIGHT, 0);
points[1] = new Point(START_HEIGHT, canvas.width);

const ctx = canvas.getContext('2d');

window.setInterval(draw, 1);

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
  lastP = points[points.indexOf(drawablePoints.slice(-1)[0])];
  return drawablePoints;
}

function drawGround(drawablePoints) {
  ctx.fillStyle = "brown";
  ctx.beginPath();
  /* start drawing from the first point (offscreen) */
  ctx.moveTo(drawablePoints[0].x, drawablePoints[0].y);
  for (p in drawable_points) {
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
  return points.map(p => p.x -= DELTA);
}

function adjustPoints(points) {
  /* If the second points is off the screen, delete the first. */
  if (points[1].x < 0) {
    points.shift();
    points.push(new Points(randomX(), randomY()));
  }
}

function draw() {
  drawBackground();
  drawGround(getDrawablePoints(points));
  points = movePoints(points);
  points = adjustPoints(points);
}


