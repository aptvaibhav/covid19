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

        <div class="indiaDetail">
          <label class="indiaHeader">
            <input id="indeterminate-checkbox" type="checkbox"/>
            <span class="indiaSelect">India</span>
          </label>
          <div class="indiaStates">
            <div class="stateBox">

            </div>
          </div>
        </div>

        <div class="selectCountry">
          <select class="browser-default chooseOption">
            <option value="">Choose your country</option>
          </select>
        </div>


        <div class="otherDetail">
          <div class="indiaStates">
            <div class="stateBox">
              <p>Total : 966</p>
              <p>Recoverd : 240</p>
              <p>Death : 26</p>
              <p class="lastUpdated">Last Updated : March 31st 2020, 9:43:27 PM</p>
            </div>
          </div>
        </div>

        <div class="stayHome">
          <img src="/static/media/stayHome.f0ea6dbb.png"/>
        </div>

        <footer class="footerCss">
          Developed by Team @ Tech Aditya
        </footer>

      </div>
    );
  }
}

export default App;