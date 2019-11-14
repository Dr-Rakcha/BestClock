var COLOR_RECT = '#dddee2',
	COLOR_FIGURE_SIX = '#003061',
	COLOR_HOUR_HAND = 'black',
	COLOR_MINUTE_HAND = 'black',
	COLOR_SECOND_HAND = '#FF0000',
	COLOR_NUMBER = '#FF0000',
	COLOR_TITLE = '#003061',
	TITLE = '',
	WIDTH = 700,
	HEIGHT = 700;

var canvas = document.createElement('canvas'),
	canvasBg = document.createElement('canvas');
canvas.style.cssText = canvasBg.style.cssText = 'display: block;position: absolute;left: 0;top: 0;right: 0;bottom: 0;margin:auto';

document.body.appendChild(canvasBg);
document.body.appendChild(canvas);

var ctx = canvas.getContext('2d'),
	ctxBg = canvasBg.getContext('2d');

var size, id;

function init() {
	size = HEIGHT < WIDTH ? HEIGHT : WIDTH;

	ctxBg.canvas.width = ctx.canvas.width = WIDTH;
	ctxBg.canvas.height = ctx.canvas.height = HEIGHT;

	ctxBg.textAlign = 'center';
	ctxBg.textBaseline = 'middle';
	ctxBg.lineJoin = ctxBg.lineCap = 'round';

	ctx.translate(WIDTH >> 1, HEIGHT >> 1);
	ctxBg.translate(WIDTH >> 1, HEIGHT >> 1);

	//Scaling the Canvas
	var scaleXY = size / 800;
	ctx.scale(scaleXY, scaleXY);
	ctxBg.scale(scaleXY, scaleXY);

	ctx.shadowColor = 'rgba(0,0,0,0.8)';
	ctx.shadowBlur = size / 100;
	ctx.shadowOffsetX = -size / 200;
	ctx.shadowOffsetY = size / 200;

	ctx.strokeStyle = 'rgba(255,255,255,0.6)';

	drawFace();
	drawText();
	drawNumber();

	//translate hands
	ctx.translate(0, 86);
}
function start() {
	if (id == undefined) {
		id = requestAnimationFrame(drawClock);
	}
}
function drawClock() {
	//1 clean canvas
	ctx.clearRect(-400, -486, 800, 800);

	//2 update
	var now = new Date(),
		hour = now.getHours(),
		minute = now.getMinutes(),
		second = now.getSeconds(),
		milliSecond = now.getMilliseconds(),
		angH = (hour + minute / 60) * 30,
		angM = (minute + second / 60 + milliSecond / 60000) * 6,
		angS = (second + milliSecond / 1000) * 6;

	//3 rendering
	drawHand(angM, 170, COLOR_HOUR_HAND); //Minute Hand
	drawHand(angH, 130, COLOR_MINUTE_HAND); //Hour Hand
	drawHand(angS, 190, COLOR_SECOND_HAND); //Second Hand

	requestAnimationFrame(drawClock);
}

function drawFace() {
	drawSix(true);

	//save state for shadow
	ctxBg.save();

	//draw shadow of rectangle
	ctxBg.shadowColor = 'rgba(0,0,0,0.6)';
	ctxBg.shadowBlur = size / 80;
	ctxBg.shadowOffsetX = -size * 0.005;
	ctxBg.shadowOffsetY = size / 80;

	//rectangle
	ctxBg.fillStyle = COLOR_RECT;
	ctxBg.fillRect(-113, -334, 227, 677);

	ctxBg.restore();

	drawSix();
}

function drawSix(shadow) {
	ctxBg.save(); //save state for shadow

	if (shadow) {
		ctxBg.shadowColor = 'rgba(0,0,0,0.7)';
		ctxBg.shadowBlur = this.size / 100;
		ctxBg.shadowOffsetX = -this.size * 0.0075;
		ctxBg.shadowOffsetY = this.size / 80;
	}
	//backround number 6
	ctxBg.beginPath();
	ctxBg.fillStyle = COLOR_FIGURE_SIX;
	ctxBg.strokeStyle = 'black';
	ctxBg.moveTo(229, -327);
	ctxBg.bezierCurveTo(-389, -210, -459, 512, 114, 254);
	ctxBg.lineTo(114, 232);
	ctxBg.bezierCurveTo(330, 104, 305, -98, 114, -90);
	ctxBg.lineTo(114, 13);
	ctxBg.bezierCurveTo(214, 16, 226, 128, 114, 187);
	ctxBg.lineTo(114, 200);
	ctxBg.bezierCurveTo(-298, 387, -341, -39, 237, -198);
	ctxBg.fill();
	ctxBg.restore();
}

function drawText() {
	ctxBg.beginPath();
	ctxBg.fillStyle = COLOR_TITLE;
	ctxBg.font = '700 20px serif';
	if (TITLE) {
		ctxBg.fillText(TITLE, 0, -16);
		return;
	}
	//Default text
	ctxBg.fillText('RAND', -20, -16, 110);
	ctxBg.fillText('M', 36, -16);

	//small rectangle
	ctxBg.fillRect(9, -8, 18, 7);
	//cut part of rectangle below Text
	ctxBg.beginPath();
	ctxBg.fillStyle = COLOR_RECT;
	ctxBg.arc(18, -14, 10, 0, 2 * Math.PI);
	ctxBg.fill();

	//small clock
	ctxBg.beginPath();
	ctxBg.strokeStyle = COLOR_TITLE;
	ctxBg.lineWidth = 1;
	ctxBg.arc(18, -16, 8, (245 * Math.PI) / 180, (170 * Math.PI) / 180);
	ctxBg.stroke();

	//hands
	ctxBg.beginPath();
	ctxBg.moveTo(18, -16);
	ctxBg.lineTo(18, -25);
	ctxBg.moveTo(18, -16);
	ctxBg.lineTo(11, -10);
	ctxBg.stroke();
}

function drawNumber() {
	var fontSizes = [64, 64, 37, 42, 48, 53, 58, 64, 58, 61, 77, 85];
	var hyps = [216, 218, 184, 176, 184, 224, 254, 229, 208, 212, 260, 392];

	ctxBg.beginPath();
	ctxBg.fillStyle = COLOR_NUMBER;
	for (var i = 0, nx, ny, ang; i < 12; i++) {
		ang = ((i * 30 - 30) * Math.PI) / 180;
		nx = Math.cos(ang) * hyps[i];
		ny = Math.sin(ang) * hyps[i];
		ctxBg.font = '700 ' + fontSizes[i] + 'px serif';
		ctxBg.fillText(((i + 1) % 12) + 1, nx, ny + 86);
	}
}

function drawHand(angle, length, color) {
	ctx.fillStyle = color;

	ctx.rotate((Math.PI * angle) / 180);

	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(-7.5, -15);
	ctx.lineTo(0, -length);
	ctx.lineTo(7.5, -15);
	ctx.lineTo(0, 0);
	ctx.stroke();
	ctx.fill();

	ctx.rotate((-Math.PI * angle) / 180);
}

function setSize(width, height) {
	WIDTH = width;
	HEIGHT = height;
	init();
}

init();
start();
