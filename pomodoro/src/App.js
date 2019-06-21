import React from "react";
import "./App.css";
import moment from 'moment/moment.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num_b: 3,
      num_s: 25,
      timer_label: false,
      start: false,
      countdown: "25:00"

    }
  }

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
            countdown: (md.num_b - 1) + ":00"
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
            countdown: (md.num_s + 1) + ":00"
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
            countdown: (md.num_s - 1) + ":00"
          });
        }
      }
    }
  };

  start_pause = (el) => {   
    console.log("fired")
      document.getElementById("session-decrement").disabled = el;
      document.getElementById("session-increment").disabled = el;
      document.getElementById("break-decrement").disabled = el;
      document.getElementById("break-increment").disabled = el;


  }

  initTimer = () => {
    this.setState({
      start: !this.state.start
    },() => {this.start_pause(this.state.start)});
  }

  

  // componentDidUpdate() {
  //   var md = this.state;

  //   if(md.timer_label === false) { // bool is synomynous with timer label break
  //     this.setState({
  //           countdown: moment.utc(((md.num_b)*1000)*60).format("mm:ss")
  //     });
  //   }
  // }

  render() {
    const state = this.state;

    return (
      <div className="App">
        <div className="app-frame">
          {/* break block */}
          <div className="break-block">
            <h1 id="break-label">Break Length</h1>
            <div>
              <button id="break-increment" onClick={(e) => this.modifyNum_x(e)}>+</button>
              <p id="break-length">{state.num_b}</p>
              <button id="break-decrement" onClick={(e) => this.modifyNum_x(e)}>-</button>
            </div>
          </div>

          {/* session block */}
          <div>
            <h1 id="session-label">Session Length</h1>
            <div>
              <button id="session-increment" onClick={(e) => this.modifyNum_x(e)} >+</button>
              <p id="session-length">{state.num_s}</p>
              <button id="session-decrement" onClick={(e) => this.modifyNum_x(e)}>-</button>
            </div>
          </div>

          {/* timer display block */}
          <div>
            <h2 id="timer-label">{state.timer_label ? "session" : "break"}</h2>
            <h2 id="time-left">{state.countdown}</h2>
          </div>

          {/* start control block */}
          <div>
            <button id="start_stop" onClick={this.initTimer}>start</button>
            <button id="reset">reset</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
