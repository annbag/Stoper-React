"use strict";

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
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			},
			results: []
		};
		_this.running = false;
		return _this;
	}

	_createClass(Stopwatch, [{
		key: "reset",
		value: function reset() {
			this.setState({
				times: {
					minutes: 0,
					seconds: 0,
					miliseconds: 0
				}
			});
		}
	}, {
		key: "format",
		value: function format(times) {
			return pad0(times.minutes) + ":" + pad0(times.seconds) + ":" + pad0(Math.floor(times.miliseconds));
		}
	}, {
		key: "start",
		value: function start() {
			var _this2 = this;

			if (!this.state.running) {
				this.running = true;
				this.watch = setInterval(function () {
					return _this2.step();
				}, 10);
			}
		}
	}, {
		key: "step",
		value: function step() {
			if (!this.running) return;
			this.calculate();
		}
	}, {
		key: "calculate",
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
			//aktualizacaj times
			this.setState({
				times: {
					minutes: minutes,
					seconds: seconds,
					miliseconds: miliseconds
				}
			});
		}
	}, {
		key: "stop",
		value: function stop() {
			this.running = false;
			clearInterval(this.watch);
		}
	}, {
		key: "resetwatch",
		value: function resetwatch() {
			this.running = false;
			this.reset();
			clearInterval(this.watch);
		}
	}, {
		key: "save",
		value: function save() {
			var results = this.state.results.slice();
			results.push(this.format(this.state.times));
			this.setState({ results: results });
		}
	}, {
		key: "clear",
		value: function clear() {
			this.setState({ results: [] });
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"h1",
					null,
					"Stoper"
				),
				React.createElement(
					"nav",
					{ className: "controls" },
					React.createElement(
						"button",
						{ onClick: this.start.bind(this) },
						"Start"
					),
					React.createElement(
						"button",
						{ onClick: this.stop.bind(this) },
						"Stop"
					),
					React.createElement(
						"button",
						{ onClick: this.reset.bind(this) },
						"Reset"
					),
					React.createElement(
						"button",
						{ onClick: this.save.bind(this) },
						"Save"
					),
					React.createElement(
						"button",
						{ onClick: this.clear.bind(this) },
						"Clear"
					)
				),
				React.createElement(
					"div",
					{ className: "stopwatch" },
					this.format(this.state.times)
				),
				React.createElement(
					"ul",
					{ className: "results" },
					this.state.results.map(function (result) {
						return React.createElement(
							"li",
							null,
							result
						);
					})
				)
			);
		}
	}]);

	return Stopwatch;
}(React.Component);

/*const stopwatch = new Stopwatch(
document.querySelector('.stopwatch'));

const startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.resetwatch());*/

//pad0 ma za zadanie dodać zero do liczb jednocyfrowych


function pad0(value) {
	var result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
}

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('app'));
