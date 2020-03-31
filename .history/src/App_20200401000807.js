import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {

  }
  componentDidMount() {
    fetch('https://contesttrackerapi.herokuapp.com/android/')
      .then(res => res.json())
      .then(data => this.setState({ users:data.result.ongoing,less:data.result.upcoming }));
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
              <div className="stateBox">
                <p>Total <span>in India</span> : 1616</p>
                <p>Currently Infected : 1419</p>
                <p>Recoverd : 150</p>
                <p>Death : 47</p>
                <p className="lastUpdated">Last Updated : March 31st 2020, 11:07:25 PM</p>
              </div>
            </div>
          </div>

        <div className="selectCountry">
          <select className="browser-default chooseOption">
            <option value="">Choose your country</option>
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
          <img src="/static/media/stayHome.f0ea6dbb.png"/>
        </div>

        <footer className="footerCss">
          Developed by Team @ Tech Aditya
        </footer>

      </div>
    );
  }
}

export default App;