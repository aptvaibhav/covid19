import React, { Component } from 'react';
import countries from './country.json';
import './App.css';
import stayHome from './stayHome.png'

class App extends Component {
  state = {
    covid : [],
    indiaLoaded : false
  }
  componentDidMount() {
    fetch('https://api.covid19india.org/data.json')
      .then(res => res.json())
      .then(data => this.setState({ 
        covid : data,
        indiaLoaded : true
      }));
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h3>Hello Corona</h3>
        </div>

        <div className="indiaDetail">
          <label className="indiaHeader">
            <input id="indeterminate-checkbox" type="checkbox"/>
              <span className="indiaSelect">India</span>
            </label>
            <div className="indiaStates">
              {this.state.covid && this.state.indiaLoaded ? 
                <div className="stateBox">
                  <p>Total <span>in India</span> : 1616</p>
                  <p>Currently Infected : 1419</p>
                  <p>Recoverd : 150</p>
                  <p>Death : 47</p>
                  <p className="lastUpdated">Last Updated : March 31st 2020, 11:07:25 PM</p>
                </div> : null }
            </div>
          </div>

        <div className="selectCountry">
          <select className="browser-default chooseOption">
            <option value="">Choose your country</option>
            {countries.map((data,idx)=>{
              return (
                <option value={data.code} key={idx}> {data.name} {data.emoji}</option>
              )
            })}
          </select>
        </div>


        <div className="otherDetail">
          <div className="indiaStates">
            <div className="stateBox">
              <p>Total : 966</p>
              <p>Recoverd : 240</p>
              <p>Death : 26</p>
              <p className="lastUpdated">Last Updated : March 31st 2020, 9:43:27 PM</p>
            </div>
          </div>
        </div>

        <div className="stayHome">
          <img src= {stayHome}/>
        </div>

        <footer className="footerCss">
          Developed by Team @ Tech Aditya
        </footer>

      </div>
    );
  }
}

export default App;