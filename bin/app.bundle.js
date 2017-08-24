/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _StopWatch = __webpack_require__(1);

var _StopWatch2 = _interopRequireDefault(_StopWatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {
  var watch = new _StopWatch2.default(document.getElementById('root'));
  document.getElementById('start').addEventListener('click', function () {
    return watch.start();
  });
  document.getElementById('stop').addEventListener('click', function () {
    return watch.stop();
  });
  document.getElementById('pause').addEventListener('click', function () {
    return watch.pause();
  });
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StopWatch = function () {
  function StopWatch(DOMNode) {
    _classCallCheck(this, StopWatch);

    this.CLOCK_CENTER = {
      x: 100,
      y: 75,
      r: 50
    };
    this.DOMNode = DOMNode;
    this.timer = null;
    this.handTopCoords = {
      x: this.CLOCK_CENTER.x,
      y: this.CLOCK_CENTER.y - this.CLOCK_CENTER.r + 5
    };
    this.value = 0;
    this.isValidDOMNode = DOMNode.tagName && DOMNode.tagName === 'CANVAS';
    if (this.isValidDOMNode) {
      this.renderClock(this.handTopCoords);
    } else {
      alert('invalid input value');
    }
  }

  _createClass(StopWatch, [{
    key: 'renderClock',
    value: function renderClock() {
      var handVector = {
        x: this.CLOCK_CENTER.x - this.handTopCoords.x,
        y: this.CLOCK_CENTER.y - this.handTopCoords.y
      };
      var cos = Math.cos(6 * this.value * Math.PI / 180);
      var sin = Math.sin(6 * this.value * Math.PI / 180);
      var x = handVector.x,
          y = handVector.y;

      var calcCoords = {
        x: x * cos - y * sin,
        y: x * sin + y * cos
      };
      var coords = this.value === 0 ? _extends({}, this.handTopCoords) : {
        x: this.CLOCK_CENTER.x - calcCoords.x,
        y: this.CLOCK_CENTER.y - calcCoords.y
      };
      var context = this.DOMNode.getContext("2d");
      context.clearRect(0, 0, this.DOMNode.width, this.DOMNode.height);
      context.beginPath();
      context.arc(this.CLOCK_CENTER.x, this.CLOCK_CENTER.y, this.CLOCK_CENTER.r, 0, 2 * Math.PI);
      context.moveTo(this.CLOCK_CENTER.x, this.CLOCK_CENTER.y);
      context.lineTo(coords.x, coords.y);
      context.stroke();
    }
  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      if (!this.timer && this.isValidDOMNode) {
        this.timer = setInterval(function () {
          _this.value = _this.value < 59 ? _this.value + 1 : 0;
          _this.renderClock();
        }, 1000);
      }
    }
  }, {
    key: 'pause',
    value: function pause() {
      clearInterval(this.timer);
      this.timer = null;
    }
  }, {
    key: 'stop',
    value: function stop() {
      clearInterval(this.timer);
      this.timer = null;
      this.value = 0;
      if (this.isValidDOMNode) this.renderClock();
    }
  }]);

  return StopWatch;
}();

exports.default = StopWatch;
;

/***/ })
/******/ ]);