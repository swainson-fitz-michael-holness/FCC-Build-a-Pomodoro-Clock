import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num_b: 5,
      num_s: 25,
      timer_label: true,
      start: false

    }
  }

  modifyNum_x = (e) => {
    var id = e.target.id;
    var md = this.state

    if(id === "break-increment") {
      if(md.num_b < 60) {
        this.setState({
          num_b: this.state.num_b + 1
        });
      } 
    }

    if(id === "break-decrement") {
      if(md.num_b > 1){
        this.setState({
          num_b: this.state.num_b - 1
        });
      }
    }

    if(id === "session-increment") {
      if(md.num_s < 60){
        this.setState({
          num_s: this.state.num_s + 1
        });
      }  
    }

    if(id === "session-decrement") {
      if(md.num_s > 1){
        this.setState({
          num_s: this.state.num_s - 1
        });
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

  // componentDidMount() {
  //   this.setState({
  //     num_b: document.getElementById("break-length").innerText,
  //     num_s: document.getElementById("session-length").innerText,
  //   });
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
            <h2 id="time-left">00:11</h2>
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
