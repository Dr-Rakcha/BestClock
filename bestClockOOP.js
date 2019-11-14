function BestClock(id, options) {
	this.settings = {
		colorRect: '#dddee2',
		colorFigureSix: 'black',
		colorNumber: '#dc0406',
		colorHourHand: 'black',
		colorMinuteHand: 'black',
		colorSecondHand: '#dc0406',
		colorText: '#003061',
		text: '',
		width: 700,
		height: 700
	};

	for (var attrName in options) {
		this.settings[attrName] = options[attrName];
	}
	var container = document.getElementById(id),
		canvasBg = document.createElement('canvas'),
		canvas = document.createElement('canvas');
	this.ctx = canvas.getContext('2d');
	this.ctxBg = canvasBg.getContext('2d');

	if (!container) {
		throw '#' + id + ' not found';
	}

	canvas.style.cssText = canvasBg.style.cssText = 'display: block;position: absolute;left: 0;top: 0;right: 0;bottom: 0;margin:auto';

	container.appendChild(canvasBg);
	container.appendChild(canvas);

	this.init();
	this.start();
}
BestClock.prototype = {
	init: function() {
		this.size = this.settings.height < this.settings.width ? this.settings.height : this.settings.width;

		this.ctxBg.canvas.width = this.ctx.canvas.width = this.settings.width;
		this.ctxBg.canvas.height = this.ctx.canvas.height = this.settings.height;

		this.ctxBg.textAlign = 'center';
		this.ctxBg.textBaseline = 'middle';
		this.ctxBg.lineJoin = this.ctxBg.lineCap = 'round';

		this.ctx.translate(this.settings.width >> 1, this.settings.height >> 1);
		this.ctxBg.translate(this.settings.width >> 1, this.settings.height >> 1);

		//Scaling the Canvas
		var scaleXY = this.size / 800;
		this.ctx.scale(scaleXY, scaleXY);
		this.ctxBg.scale(scaleXY, scaleXY);

		this.ctx.shadowColor = 'rgba(0,0,0,0.8)';
		this.ctx.shadowBlur = this.size / 100;
		this.ctx.shadowOffsetX = -this.size / 200;
		this.ctx.shadowOffsetY = this.size / 200;

		this.ctx.strokeStyle = 'rgba(255,255,255,0.6)';

		this.drawFace();
		this.drawText();
		this.drawNumber();

		//translate hands
		this.ctx.translate(0, 86);
	},

	start: function() {
		requestAnimationFrame(this.drawClock.bind(this));
	},

	drawClock: function() {
		//1 clean canvas
		this.ctx.clearRect(-400, -486, 800, 800);

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
		this.drawHand(angM, 170, this.settings.colorHourHand); //Minute Hand
		this.drawHand(angH, 130, this.settings.colorMinuteHand); //Hour Hand
		this.drawHand(angS, 190, this.settings.colorSecondHand); //Second Hand

		requestAnimationFrame(this.drawClock.bind(this));
	},

	drawFace: function() {
		this.drawSix(true);

		//save state for shadow
		this.ctxBg.save();

		//draw shadow of rectangle
		this.ctxBg.shadowColor = 'rgba(0,0,0,0.6)';
		this.ctxBg.shadowBlur = this.size / 80;
		this.ctxBg.shadowOffsetX = -this.size * 0.005;
		this.ctxBg.shadowOffsetY = this.size / 80;
		//rectangle
		this.ctxBg.fillStyle = this.settings.colorRect;
		this.ctxBg.fillRect(-113, -334, 227, 677);

		this.ctxBg.restore();

		this.drawSix();
	},

	drawSix: function(shadow) {
		this.ctxBg.save(); //save state for shadow

		if (shadow) {
			this.ctxBg.shadowColor = 'rgba(0,0,0,0.7)';
			this.ctxBg.shadowBlur = this.size / 100;
			this.ctxBg.shadowOffsetX = -this.size * 0.0075;
			this.ctxBg.shadowOffsetY = this.size / 80;
		}
		//backround number 6
		this.ctxBg.beginPath();
		this.ctxBg.fillStyle = this.settings.colorFigureSix;
		this.ctxBg.strokeStyle = 'black';
		this.ctxBg.moveTo(229, -327);
		this.ctxBg.bezierCurveTo(-389, -210, -459, 512, 114, 254);
		this.ctxBg.lineTo(114, 232);
		this.ctxBg.bezierCurveTo(330, 104, 305, -98, 114, -90);
		this.ctxBg.lineTo(114, 13);
		this.ctxBg.bezierCurveTo(214, 16, 226, 128, 114, 187);
		this.ctxBg.lineTo(114, 200);
		this.ctxBg.bezierCurveTo(-298, 387, -341, -39, 237, -198);
		this.ctxBg.fill();
		this.ctxBg.restore();
	},

	drawText: function() {
		this.ctxBg.beginPath();
		this.ctxBg.fillStyle = this.settings.colorText;
		this.ctxBg.font = '700 20px serif';
		if (this.settings.text) {
			this.ctxBg.fillText(this.settings.text, 0, -16);
			return;
		}
		//Default text
		this.ctxBg.fillText('RAND', -20, -16, 110);
		this.ctxBg.fillText('M', 36, -16);

		//small rectangle
		this.ctxBg.fillRect(9, -8, 18, 7);
		//cut part of rectangle below Text
		this.ctxBg.beginPath();
		this.ctxBg.fillStyle = this.settings.colorRect;
		this.ctxBg.arc(18, -14, 10, 0, 2 * Math.PI);
		this.ctxBg.fill();

		//small clock
		this.ctxBg.beginPath();
		this.ctxBg.strokeStyle = this.settings.colorText;
		this.ctxBg.lineWidth = 1;
		this.ctxBg.arc(18, -16, 8, (245 * Math.PI) / 180, (170 * Math.PI) / 180);
		this.ctxBg.stroke();

		//hands
		this.ctxBg.beginPath();
		this.ctxBg.moveTo(18, -16);
		this.ctxBg.lineTo(18, -25);
		this.ctxBg.moveTo(18, -16);
		this.ctxBg.lineTo(11, -10);
		this.ctxBg.stroke();
	},

	drawNumber: function() {
		var fontSizes = [64, 64, 37, 42, 48, 53, 58, 64, 58, 61, 77, 85];
		var hyps = [216, 218, 184, 176, 184, 224, 254, 229, 208, 212, 260, 392];
		this.ctxBg.beginPath();
		this.ctxBg.fillStyle = this.settings.colorNumber;
		for (var i = 0, nx, ny, ang; i < 12; i++) {
			ang = ((i * 30 - 30) * Math.PI) / 180;
			nx = Math.cos(ang) * hyps[i];
			ny = Math.sin(ang) * hyps[i];
			this.ctxBg.font = '700 ' + fontSizes[i] + 'px serif';
			this.ctxBg.fillText(((i + 1) % 12) + 1, nx, ny + 86);
		}
	},

	drawHand: function(angle, length, color) {
		this.ctx.fillStyle = color;

		this.ctx.rotate((Math.PI * angle) / 180);

		this.ctx.beginPath();
		this.ctx.moveTo(0, 0);
		this.ctx.lineTo(-7, -10);
		this.ctx.lineTo(0, -length);
		this.ctx.lineTo(7, -10);
		this.ctx.lineTo(0, 0);
		this.ctx.stroke();
		this.ctx.fill();

		this.ctx.rotate((-Math.PI * angle) / 180);
	},

	setSize: function(width, height) {
		if (width <= 0 || height <= 0) return;
		this.settings.width = width;
		this.settings.height = height;
		this.init();
	}
};
