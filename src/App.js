import React, { Component } from 'react';
import countries from './country.json';
import './App.css';
import stayHome from './stayHome.png';
const moment = require('moment');

class App extends Component {
  state = {
    covid : [],
    otherCovid : {},
    indiaLoaded : false,
    noOtherCovid : false,
    loadingOther : false,
    showIndia : false,
    covidIndia : {},
    showWorld : false,
    otherCovidName : ''
  }
  componentDidMount() {
    fetch('https://api.covid19india.org/data.json')
      .then(res => res.json())
      .then(data => this.setState({ 
        covid : data,
        indiaLoaded : true
      }));
  }

  handleChange = (e) => {
    e.persist()
    let countryCode = e.target.value || "CN";
    var index = e.nativeEvent.target.selectedIndex;
    console.log(e.nativeEvent.target[index].text);
    this.setState({
      loadingOther : true,
      noOtherCovid : false
    });

    fetch(`https://covid19.mathdro.id/api/countries/${countryCode}`)
    .then((res) => {
      if(res.status == '404'){
        this.setState({
          noOtherCovid : true
        });
      }
      return res.json();
    })
    .then(data => this.setState({ 
      otherCovid : data,
      otherCovidName : e.nativeEvent.target[index].text,
      loadingOther : false
    }))
    .catch((err)=>{
      console.log("Here");
    });

  }

  enableIndia = () =>{
    this.setState({
      showIndia : !this.state.showIndia
    });
  }

  enableWorld = () => {
    this.setState({
      showWorld : !this.state.showWorld
    });
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <p>Hello Corona</p>
        </div>

        <p className="description">
          COVID19 Cases in India Till Now
        </p>

        <div className="row">
          <div className="col s6 m6">
            <div className="card-block card blue-grey">
              <div className="card-content white-text">
                <span className="cardTitle">Total Confirmed</span>
                {this.state.covid && this.state.indiaLoaded ? <span className="cardData">{parseInt(this.state.covid.statewise[0].confirmed) + 15}</span> : <span className="cardData">Loading..</span>}
              </div>
            </div>
          </div>
          <div className="col s6 m6">
            <div className="card-block card blue-grey">
              <div className="card-content white-text">
                <span className="cardTitle">Currently Infected</span>
                {this.state.covid && this.state.indiaLoaded ? <span className="stat-ci">{parseInt(this.state.covid.statewise[0].active) + 15}</span> : <span className="cardData">Loading..</span>}
              </div>
            </div>
          </div>
          <div className="col s6 m6">
            <div className="card-block card blue-grey">
              <div className="card-content white-text">
                <span className="cardTitle">Total Recoverd</span>
                {this.state.covid && this.state.indiaLoaded ?  <span className="stat-re">{this.state.covid.statewise[0].recovered}</span> : <span className="cardData">Loading..</span>}
              </div>
            </div>
          </div>
          <div className="col s6 m6">
            <div className="card-block card blue-grey">
              <div className="card-content white-text">
                <span className="cardTitle">Total Death</span>
                {this.state.covid && this.state.indiaLoaded ? <span className="stat-de">{this.state.covid.statewise[0].deaths}</span> : <span className="cardData">Loading..</span>}
              </div>
            </div>
          </div>

          <div className="col s12 m12">
            {this.state.covid && this.state.indiaLoaded ? <p className="lastUpdated">Last Updated : {moment(this.state.covid.statewise[0].lastupdatedtime, 'DD/MM/YYYY hh:mm:ss').format('MMMM Do YYYY, h:mm:ss A')}</p> : null}
          </div>
        </div>

        <div className="row">
          <div className="col s12 m12">
            <div className="switch">
              <div className="col s6 m6 checkBoxes">
                {this.state.indiaLoaded && this.state.covid ?
                <label>
                  Indian Data
                  <input type="checkbox" onChange={this.enableIndia}/>
                  <span className="lever"></span>
                </label> : null }
              </div>
              
              <div className="col s6 m6 checkBoxes">
                <label>
                  World Data
                  <input type="checkbox" onChange={this.enableWorld}/>
                  <span className="lever"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="col s12 m12">
            {this.state.showWorld ?
              <select className="browser-default chooseOption chooseOpt" onChange={this.handleChange}>
                <option value="">Choose your country</option>
                {countries.map((data,idx)=>{
                  return (
                    <option value={data.code} key={idx} name={data.name}> {data.name} {data.emoji}</option>
                  )
                })}
              </select>: null }
          </div>

          <div className="col s12 m12">
            {!this.state.loadingOther && this.state.showWorld && this.state.otherCovid && this.state.otherCovid.confirmed && this.state.otherCovid.recovered && this.state.otherCovid.deaths && this.state.otherCovid.lastUpdate ? 
            <div className="stateBox">
              <p>Total in {this.state.otherCovidName}: {this.state.otherCovid.confirmed.value}</p>
              <p>Recoverd : {this.state.otherCovid.recovered.value}</p>
              <p>Death : {this.state.otherCovid.deaths.value}</p>
              <p className="lastUpdated">Last Updated : {moment(this.state.otherCovid.lastUpdate).format('MMMM Do YYYY, h:mm:ss A')}</p>
            </div> : this.state.loadingOther ? <p className="loadingOtherColor">Loading...</p> : null}
            {this.state.noOtherCovid ? this.state.showWorld ? <p className="loadingOtherColor">No Patient Here, Stay Safe</p> : null : null}
          </div>

          <div className="col s12 m12">
                {this.state.covid && this.state.indiaLoaded && this.state.showIndia ?
                  this.state.covid.statewise.map((data,idx)=>{

                    if(idx == 0)
                      return;
                    return(
                      <div className="stateBox" key={idx}>
                        <p>{idx == 0 ? <span>Total in India</span> : <span>{data.state}</span>} : {(parseInt(data.confirmed)+15)}</p>
                        <p>Currently Infected : {(parseInt(data.active)+15)}</p>
                        <p>Recoverd : {data.recovered}</p>
                        <p>Death : {data.deaths}</p>
                        <p className="lastUpdated">Last Updated : {moment(data.lastupdatedtime, 'DD/MM/YYYY hh:mm:ss').format('MMMM Do YYYY, h:mm:ss A')}</p>
                      </div>
                    )
                  })
                  : null }
            </div>
        </div>

        <div className="row">
          <div className="col s12 m12 stayHome">
            <img src= {stayHome}/>
          </div>
        </div>

        <div className="row">
            <div className="col s12 m12">
            <footer className="footerCss">
              Developed by Team @ Tech Vaibhav Tyagi
            </footer>
            </div>
        </div>
        

      </div>
    );
  }
}

export default App;