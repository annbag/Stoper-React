class Stopwatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			running: false,
			times: {
				minutes: 0,
	            seconds: 0,
	            miliseconds: 0
			},			
		}
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
//czy print się zmienia?
    print() {
        this.display.innerText = this.format(this.times);
	}
	format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}
    start() {
	    if (!this.state.running) {
	        this.setState({
	        	running: true,
		        watch: setInterval(() => this.step(), 10)
	        })		        
	    }
	}
	step() {
	    if (!this.state.running) return;
	    this.calculate();
	    this.print();
	}
	calculate() {
	    let{minutes, seconds, miliseconds}=this.state.times;
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
	stop() {
	    this.setState({
	    	running: false
	    })	    
	    clearInterval(this.state.watch);
	}
	resetwatch() {
		this.setState({
			running: false,
		})
		clearInterval(this.state.watch);
		this.reset();
		this.print();
	}
}


const stopwatch = new Stopwatch(
document.querySelector('.stopwatch'));

const startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.resetwatch());

//pad0 ma za zadanie dodać zero do liczb jednocyfrowych
function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
};

ReactDOM.render(
	<Stopwatch />, 
	document.getElementById('app')
);
