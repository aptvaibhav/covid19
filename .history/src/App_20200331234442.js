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

      </div>
    );
  }
}

export default App;