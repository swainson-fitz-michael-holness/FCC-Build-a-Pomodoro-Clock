import React from "react";
import "./App.css";
var timer;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num_b: 5,
      num_s: 25,
      timer_label: true,
      start: false,
      countdown: "25:00"

    }
  }

  // Each condition represnts a button
  modifyNum_x = (e) => {
    var id = e.target.id;
    var md = this.state

    if(id === "break-increment") {
      if(md.num_b < 60) {

        this.setState({
          num_b: md.num_b + 1,
        });

        if(md.timer_label === false) {
          this.setState({
            countdown: ("0" + (md.num_b + 1)).slice(-2) + ":00" //custom method to get the string format mm:ss = mm:00
          });
        }
      }   
    }

    if(id === "break-decrement") {
      if(md.num_b > 1){
        this.setState({
          num_b: md.num_b - 1,
        });

        if(md.timer_label === false) {
          this.setState({
            countdown: ("0" + (md.num_b - 1)).slice(-2) + ":00"
          });
        }
      }
    }

    if(id === "session-increment") {
      if(md.num_s < 60){
        this.setState({
          num_s: this.state.num_s + 1,
        });

        if(md.timer_label === true) {
          this.setState({
            countdown: ("0" + (md.num_s + 1)).slice(-2) + ":00"
          });
        }
      }
      
      
    }

    if(id === "session-decrement") {
      if(md.num_s > 1){
        this.setState({
          num_s: this.state.num_s - 1,
        });

        if(md.timer_label === true) {
          this.setState({
            countdown: ("0" + (md.num_s - 1)).slice(-2) + ":00"
          });
        }
      }
    }
  };

  start_pause = (el) => {   
      document.getElementById("session-decrement").disabled = el;
      document.getElementById("session-increment").disabled = el;
      document.getElementById("break-decrement").disabled = el;
      document.getElementById("break-increment").disabled = el;
  }
  
  tick = (t_t) => {
    var tic = this.state;
    timer = setTimeout(
        () => {
          if(t_t > 0){
            t_t = t_t - 1;
            var min = Math.floor(t_t / 60);
            var sec = t_t % 60;
            this.setState({
              countdown: ("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2)
            }, this.tick(t_t)); 
          } else{
            t_t = (tic.num_b) * 60;
            document.getElementById("beep").play();
            this.setState({
              timer_label: !tic.timer_label,
              countdown: ("0" + (tic.num_b)).slice(-2) + ":00"
            }, this.tick(t_t))
          };
        }, 1000);  
  }

  initTimer = () => {
    var timer_block = this.state;
    var time_arr = timer_block.countdown.split(":");
    var total_time = (time_arr[0] * 60) + parseInt(time_arr[1], 10);

    this.setState({
      start: !timer_block.start
    },() => {
      this.start_pause(this.state.start);
      if(timer_block.start === true) {
        clearTimeout(timer);
      } else {
        this.tick(total_time);
      }
    });
  }
  
  reset = () => {
    this.start_pause(false);
    document.getElementById("beep").pause()
    document.getElementById("beep").currentTime = 0;
    clearTimeout(timer);
    this.setState({
      num_b: 5,
      num_s: 25,
      countdown: "25:00",
      timer_label: true,
      start: false,
    });
  };

  render() {
    const state = this.state;

    return (
      <div className="frame">
        <div className="container">
          <h1>Pomodoro App</h1>

          {/* break block */}
          <div className="break-block">
            <h3 id="break-label">Break Length</h3>
            <div className="controls">
              <div className="control-item"><button className="btn-control" id="break-increment" onClick={(e) => this.modifyNum_x(e)}>+</button></div>
              <div className="control-item"><p className="input-num" id="break-length">{state.num_b}</p></div>
              <div className="control-item"><button className="btn-control" id="break-decrement" onClick={(e) => this.modifyNum_x(e)}>-</button></div>
            </div>
          </div>

          {/* session block */}
          <div>
            <h3 id="session-label">Session Length</h3>
            <div className="controls">
              <div className="control-item"><button className="btn-control" id="session-increment" onClick={(e) => this.modifyNum_x(e)} >+</button></div>
              <div className="control-item"><p className="input-num" id="session-length">{state.num_s}</p></div>
              <div className="control-item"><button className="btn-control" id="session-decrement" onClick={(e) => this.modifyNum_x(e)}>-</button></div>  
            </div>
          </div>

          {/* timer display block */}
          <div>
            <h2 id="timer-label">{state.timer_label ? "session" : "break"}</h2>
            <h2 id="time-left">{state.countdown}</h2>
          </div>

          {/* start control block */}
          <div>
            <button className="play-controls" id="start_stop" onClick={this.initTimer}>start</button>
            <button className="reset-controls" id="reset" onClick={this.reset}>reset</button>
          </div>

          <p className="sig">coded by Swainson Holness</p>

          {/* Audio Block */}
          <audio id="beep" src="http://res.cloudinary.com/dxaedzhnh/video/upload/v1516053449/start.mp3" type="audio/mpeg"></audio>
        </div>
      </div>
    );
  }
}

export default App;
