class Stopwatch extends React.Component { 
	constructor(props) {
		super(props);
		this.state = {			
			times: {
				minutes: 0,
	            seconds: 0,
	            miliseconds: 0
			},
			results: []	
		}
		this.running = false;
	}
	reset() {
        this.setState({
	        times: {
	            minutes: 0,
	            seconds: 0,
	            miliseconds: 0
	        }
    	})
    }
	format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}
    start() {
	    if (!this.state.running) {
	        this.running = true;
	        this.watch = setInterval(() => this.step(), 10);
	    }
	}
	step() {
	    if (!this.running) return;
	    this.calculate();	
	}
	calculate() {
	    let { minutes, seconds, miliseconds } = this.state.times;
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
	            minutes,
	            seconds,
	            miliseconds
	        }
    	})
	}
	stop() {
	    this.running = false;
	    clearInterval(this.watch);
	}
	resetwatch() {
		this.running = false;
		this.reset();
		clearInterval(this.watch);	
	}
	save() {
		const results = this.state.results.slice(); 
		results.push(this.format(this.state.times));
		this.setState({results: results});
	}
	clear() {
		this.setState({results: [] });
	}

	render() {
		return (
			<div>
				<h1>Stoper</h1>
			    <nav className="controls">
			      <button onClick={this.start.bind(this)}>Start</button>
			      <button onClick={this.stop.bind(this)}>Stop</button>
			      <button onClick={this.reset.bind(this)}>Reset</button>
			      <button onClick={this.save.bind(this)}>Save</button>
			      <button onClick={this.clear.bind(this)}>Clear</button>
			    </nav>
			    <div className="stopwatch">
			    	{this.format(this.state.times)}
			    </div>
			    <ul className="results">
					{this.state.results.map(result => <li>{result}</li>)}
			    </ul>
			</div> 
		)
	}
}

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
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(
	<Stopwatch/>, 
	document.getElementById('app')
);
