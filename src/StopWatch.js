export default class StopWatch {
  constructor(DOMNode) {
    this.CLOCK_CENTER = {
      x: 100,
      y: 75,
      r: 50,
    };
    this.DOMNode = DOMNode;
    this.timer = null;
    this.handTopCoords = {
      x: this.CLOCK_CENTER.x,
      y: this.CLOCK_CENTER.y - this.CLOCK_CENTER.r + 5
    }
    this.value = 0;
    this.isValidDOMNode = DOMNode.tagName && DOMNode.tagName === 'CANVAS';
    if (this.isValidDOMNode) {
      this.renderClock(this.handTopCoords);
    } else {
      alert('invalid input value')
    }
  }
  renderClock() {
    const handVector = {
      x: this.CLOCK_CENTER.x - this.handTopCoords.x,
      y: this.CLOCK_CENTER.y - this.handTopCoords.y
    };
    const cos = Math.cos(6 * this.value * Math.PI / 180);
    const sin = Math.sin(6 * this.value * Math.PI / 180);
    const { x, y } = handVector;
    const calcCoords = {
      x: x * cos - y * sin,
      y: x * sin + y * cos
    }
    const coords = this.value === 0 ? {
      ...this.handTopCoords
    } : {
      x: this.CLOCK_CENTER.x - calcCoords.x,
      y: this.CLOCK_CENTER.y - calcCoords.y
    };
    const context = this.DOMNode.getContext("2d");
    context.clearRect(0, 0, this.DOMNode.width, this.DOMNode.height);
    context.beginPath();
    context.arc(this.CLOCK_CENTER.x, this.CLOCK_CENTER.y, this.CLOCK_CENTER.r, 0, 2*Math.PI);
    context.moveTo(this.CLOCK_CENTER.x, this.CLOCK_CENTER.y);
    context.lineTo(coords.x, coords.y);
    context.stroke();
  }

  start() {
    if (!this.timer && this.isValidDOMNode) {
      this.timer = setInterval(() => {
      this.value = this.value < 59 ? this.value + 1 : 0;
      this.renderClock()
      }, 1000);
    }
  }

  pause() {
    clearInterval(this.timer);
    this.timer = null;
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;
    this.value = 0;
    if (this.isValidDOMNode) this.renderClock();
  }
};
