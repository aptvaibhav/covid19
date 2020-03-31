import React, { Component } from 'react';
import countries from './country.json';
import './App.css';
import stayHome from './stayHome.png'

class App extends Component {
  state = {
    covid : [],
    otherCovid : {},
    indiaLoaded : false,
    noOtherCovid : false,
    loadingOther : false
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

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      loadingOther : true
    });
    let countryCode = e.target.value || "CN";
    try{
      fetch(`https://covid19.mathdro.id/api/countries/${countryCode}`)
      .then(res => res.json())
      .then(data => this.setState({ 
        otherCovid : data,
        loadingOther : false
      }));
    }catch(e){
      console.log("Here");
      this.setState({
        noOtherCovid : true
      })
    }

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
                this.state.covid.statewise.map((data,idx)=>{
                  return(
                    <div className="stateBox" key={idx}>
                      <p>Total <span>in India</span> : {data.confirmed}</p>
                      <p>Currently Infected : {data.active}</p>
                      <p>Recoverd : {data.recovered}</p>
                      <p>Death : {data.deaths}</p>
                      <p className="lastUpdated">Last Updated : {data.lastupdatedtime}</p>
                    </div>
                  )
                })
                 : null }
            </div>
          </div>

        <div className="selectCountry">
          <select className="browser-default chooseOption" onChange={this.handleChange}>
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
            {!this.state.loadingOther && this.state.otherCovid && this.state.otherCovid.confirmed && this.state.otherCovid.recovered && this.state.otherCovid.deaths && this.state.otherCovid.lastUpdate ? 
            <div className="stateBox">
              <p>Total : {this.state.otherCovid.confirmed.value}</p>
              <p>Recoverd : {this.state.otherCovid.recovered.value}</p>
              <p>Death : {this.state.otherCovid.deaths.value}</p>
              <p className="lastUpdated">Last Updated : {this.state.otherCovid.lastUpdate}</p>
            </div> : this.state.loadingOther ? <p>Loading...</p> : null}

            {this.state.noOtherCovid ? <p>No Pat</p> : null}
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