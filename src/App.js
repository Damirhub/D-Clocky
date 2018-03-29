import React from 'react';
import  ReactDOM  from 'react-dom';
import  './App.css';


import { confirmAlert } from 'react-confirm-alert'; // Import
//import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import './react-confirm-alert.css' // Import css






class Clock extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      date: new Date(),
      setTime : '',
      inputMinutes: '--',
      inputHours: '--',
      ringTime: '',
      pause: false
    };
  }



  // popZvrr = () => {
  submit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className=' react-confirm-alert-body'>
            <h1 className = "text-center">Zvrrr!</h1>
            <p className = "text-center">Zvrrrrrr bibibib zvrrr bibibi zvrrrrrrrrr!</p>
            <hr/>

            <button className = "btn btn-danger buttons" onClick={() => {
               this.clearAlarm()
               onClose()
            }}>Kill! </button> 
                  
            <button className = "btn btn-success buttons" onClick={() => {
                this.handleSnooze()
                onClose()
            }}>SNOOZE!</button>
  
          </div>
        )
      }
    })
  };


  handleSnooze() {
  
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if(minutes>49){
      minutes = 10-(60 % minutes)
      hours +=1
    }
    else{
      minutes +=10
    }

    if(hours === 24){
      hours = 0
    }

    if(hours<10)
     hours = "0" + hours
    if(minutes<10)
      minutes = "0" + minutes

    const snoozeTime = hours + ':' + minutes;
   

    this.setState ({
      ringTime : snoozeTime,
      inputMinutes: minutes,
      inputHours: hours,
      pause : true
    }) 

    console.log("Snooze time je: ", snoozeTime)
  }


  componentDidMount() {
    let audioTick = new Audio("https://www.freespecialeffects.co.uk/soundfx/clocks/clock_tick_03.wav");
    audioTick.volume = 0.1;
    //sound.loop = true;
    audioTick.play();

    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }


  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    },() => {
      this.alarmHandler()
      this.alarmSet() 
    })
  }


  handleHour(event) {
    if(event.target.value < 10 )
      event.target.value = "0" + event.target.value
    this.setState ({
      inputHours : event.target.value
    })
  }

  handleMinutes(event) {
    if(event.target.value < 10)
      event.target.value = "0" + event.target.value
    this.setState ({
      inputMinutes : event.target.value
    })
  }

 // alarmHandler() {
  alarmSet() {
     
    if(this.state.inputHours.length < 3 &&  this.state.inputMinutes.length < 3
      && this.state.inputHours < 24 &&  this.state.inputMinutes < 60 
      || this.state.inputHours === "--" && this.state.inputMinutes === "--")
     
      this.setState({
        ringTime: this.state.inputHours +":"+ this.state.inputMinutes 
      }), () =>this.alarmHandler()
     }

  alarmHandler() {

    console.log("alarmHandled ringTime: " + this.state.ringTime )

    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();


    if(hours<10)
     hours = "0" + hours

    if(minutes<10)
      minutes = "0" + minutes

    if(seconds<10)
      seconds = "0" + seconds


    const currentTime = hours + ':' + minutes + ':' + seconds;

    this.setState({
      currentTime : currentTime
    })


    let ring = new Audio ("https://www.freespecialeffects.co.uk/soundfx/various/goopy.wav");
    ring.loop = true;

    if(currentTime === this.state.ringTime + ":00") { 
    
    // this.popZvrr();
      ring.play(); 

    }
    if (this.state.pause){
      ring.loop = false;
      ring.pause();

      console.log("state za stop zvuk: " + this.state.pause)
    }
  }

  clearAlarm() {
    this.setState({
    inputHours: '--',
    inputMinutes:'--',
    })
  }

  /******************** *******************/


  render() {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var zones = [
      {timeZone: "America/New_York"},
      {timeZone: 'Asia/Sakhalin'},
      {timeZone: 'Europe/Isle_of_Man'},
      {timeZone: 'Africa/Johannesburg'},
      {timeZone: 'Asia/Baghdad'},
      {timeZone: 'Europe/Moscow'}
    ];

    
   
    return (

      <div className = "text-center">
      <br/>
      <p className = "light-txt">{this.state.currentTime}</p>
      <h1  className = "light-txt" > <strong>D' Clocky</strong></h1>
      <h3 className = "light-txt">{this.state.date.toLocaleDateString()}.</h3>

      <h1 className = "digit" style = {{"color":"darkred"}}>Alarm is set to: {this.state.ringTime}</h1>

        {/* <input type = "time" defaultValue = "00:00" 
          onChange = {(event) => this.onHandleChange(event)}  />

        {/* <Ring ringTime = {this.state.ringTime}/> */}

        <h2 className = "serbia">{this.state.date.toLocaleTimeString('sr-RS', options)} <br/>
         in <strong>Serbia.</strong></h2>
        <hr/>

        <form onSubmit={() => this.alarmHandler()}>
          <h2 className = 'black-txt' >Set Time</h2>

            <input  type = "number"  placeholder = '--' min="0" max="23"             
              onChange = {(event) => this.handleHour(event)}
            />

            <input type = "number" placeholder = '--' min="0" max="59"
              //step = "5"
            onChange = {(event) => this.handleMinutes(event)}
            />
         <br/>
                           
              {/* <button className = "btn btn-warning" onClick = {() =>this.alarmSet()}>Set</button> */}
        </form>

      <button className = "btn btn-danger" onClick = {() =>this.clearAlarm()}> Clear Time</button>
      <hr/>

      <form><input className = "btn btn-warning" type= "submit" value = "Reload"/></form>
      <hr/>
    

     <button onClick={this.submit}>Test Modal</button>

      <div className = "container">
      
          <h3 className = "col-md-6  time-zones">It is {this.state.date.toLocaleTimeString( 'en-US' , options ,zones[0])}<br/>
          in <strong>New York.</strong></h3>
          <h3 className = "col-md-6  time-zones">It is {this.state.date.toLocaleTimeString( 'cn-CN' ,zones[1])}<br/>
          in <strong>Sakhalin.</strong></h3>
          <h3 className = "col-md-6   time-zones">It is {this.state.date.toLocaleTimeString( 'en-US' ,zones[2])}<br/>
          in <strong>Isle of Man.</strong></h3>
       
       
          <h3 className = "col-md-6  time-zones">It is {this.state.date.toLocaleTimeString( 'en-GB' ,zones[3])}<br/>
          in <strong>Johannesburg.</strong></h3>
          <h3 className = "col-md-6  time-zones">It is {this.state.date.toLocaleTimeString('ar-EG', zones[4])}<br/>
          in <strong>Baghdad.</strong>.</h3>
          <h3 className = "col-md-6  time-zones">It is {this.state.date.toLocaleTimeString( 'hi-IN', zones[5])}<br/>
          in <strong>India.</strong></h3>
       
          <h3 className = "col-md-12 locale">It is {this.state.date.toLocaleTimeString('en-US', { hour12: false})}<br/>
          - on locale time.</h3>
          </div>
      </div>
    );
  }
}


export default Clock;