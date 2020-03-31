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
        

    </div>
    );
  }
}

export default App;