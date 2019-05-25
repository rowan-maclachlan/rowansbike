
const canvas = window.document.getElementById('tour-game');

const center_x = canvas.width / 2;
const center_y = canvas.height / 2;
const line_len = 300;
let angle = 0;

const ctx = canvas.getContext('2d');

drawBackground();
/* window.setInterval(drawLines, 1); */

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
  ctx.lineTo(0, canvas.height);
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
  ctx.lineTo(0, canvas.height);
  ctx.fill();
}

function drawBackground() {
  drawSun();
  drawBackMountains();
  drawForeMountains();
}

function drawLines() {
  const da = 1;
  angle = (angle + da) % 360;
  let x = (center_x) + (line_len * Math.cos(angle));
  let y = (center_y) + (line_len * Math.sin(angle));
  
  ctx.beginPath(); 
  ctx.lineWidth = "1";
  ctx.strokeStyle = "black";
  ctx.moveTo(center_x, center_y);
  ctx.lineTo(x, y);
  ctx.stroke();
}



