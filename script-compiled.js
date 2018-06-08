'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
	_inherits(Stopwatch, _React$Component);

	function Stopwatch(props) {
		_classCallCheck(this, Stopwatch);

		var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

		_this.state = {
			running: false,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		};
		return _this;
	}

	_createClass(Stopwatch, [{
		key: 'reset',
		value: function reset() {
			this.setState({
				times: {
					minutes: 0,
					seconds: 0,
					miliseconds: 0
				}
			});
		}
		//czy print się zmienia?

	}, {
		key: 'print',
		value: function print() {
			this.display.innerText = this.format(this.times);
		}
	}, {
		key: 'format',
		value: function format(times) {
			return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
		}
	}, {
		key: 'start',
		value: function start() {
			var _this2 = this;

			if (!this.state.running) {
				this.setState({
					running: true,
					watch: setInterval(function () {
						return _this2.step();
					}, 10)
				});
			}
		}
	}, {
		key: 'step',
		value: function step() {
			if (!this.state.running) return;
			this.calculate();
			this.print();
		}
	}, {
		key: 'calculate',
		value: function calculate() {
			var _state$times = this.state.times,
			    minutes = _state$times.minutes,
			    seconds = _state$times.seconds,
			    miliseconds = _state$times.miliseconds;

			miliseconds += 1;
			if (miliseconds >= 100) {
				seconds += 1;
				miliseconds = 0;
			}
			if (seconds >= 60) {
				minutes += 1;
				seconds = 0;
			}
		}
	}, {
		key: 'stop',
		value: function stop() {
			this.setState({
				running: false
			});
			clearInterval(this.state.watch);
		}
	}, {
		key: 'resetwatch',
		value: function resetwatch() {
			this.setState({
				running: false
			});
			clearInterval(this.state.watch);
			this.reset();
			this.print();
		}
	}]);

	return Stopwatch;
}(React.Component);

var stopwatch = new Stopwatch(document.querySelector('.stopwatch'));

var startButton = document.getElementById('start');
startButton.addEventListener('click', function () {
	return stopwatch.start();
});

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', function () {
	return stopwatch.stop();
});

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', function () {
	return stopwatch.resetwatch();
});

//pad0 ma za zadanie dodać zero do liczb jednocyfrowych
function pad0(value) {
	var result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
};
