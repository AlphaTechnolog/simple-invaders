import WelcomeScene from './scenes/welcome.js'

const BOARD_WIDTH = 350;
const BOARD_HEIGHT = 500;
const DEBUG = false;

const canvas = document.querySelector('canvas')

canvas.width = BOARD_WIDTH;
canvas.height = BOARD_HEIGHT;
canvas.style.border = 'solid 1px black';

window.boardState = {
  canvas,
  width: BOARD_WIDTH,
  height: BOARD_HEIGHT
}

const ctx = canvas.getContext('2d');

// fps mettering
let secondsPassed;
let oldTimeStamp;
let fps;

// scene
window.currentScene = undefined;

function init() {
  window.currentScene = new WelcomeScene(ctx);
  window.requestAnimationFrame(gameloop);
}

function displayFps() {
  ctx.font = '14px Arial';
  ctx.fillStyle = 'yellow';
  ctx.fillText(`FPS: ${fps}`, 10, 20);
}

function calculateFps(timestamp) {
  secondsPassed = (timestamp - oldTimeStamp) / 1000;
  oldTimeStamp = timestamp;
  fps = Math.round(1 / secondsPassed);
}

function background() {
  ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
}

function exposeTimeInfo(timestamp) {
  window.timeinfo = {
    timestamp,
    fps
  }
}

function gameloop(timestamp) {
  background();
  calculateFps(timestamp);
  exposeTimeInfo(timestamp);
  draw();
  if (DEBUG) displayFps();
  window.requestAnimationFrame(gameloop);
}

function draw() {
  if (currentScene) {
    currentScene.configure();
    currentScene.draw();
  }
}

window.onload = init
