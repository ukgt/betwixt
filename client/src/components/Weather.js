import React, { Component } from "react";

class Weather extends Component {
    render() {
        return (
            <div>

            </div>
        )
    }
}

export default Weather;




//Normally these would each be in separate component libraries.
class Weather extends React.Component {

    constructor(props) {
      super(props);
  
      this.onSubmit = this.onSubmit.bind(this);
      this.onInput = this.onInput.bind(this);
  
      // init state
      this.state = {
        input: ''
      };
    }
  
    // input change handler
    onInput(e) {
      this.setState({
        input: e.target.value
      });
      // console.log(this.state);
    }
  
    // submit handler
    onSubmit(evt) {
      this.props.loadWeather(this.state.input);
      evt.preventDefault();
    }
  
    render() {
      return (
        <div className="weather">
          <form onSubmit={this.onSubmit}>
          <input
            // use value and onChange so it will be a controlled component
            value={ this.state.value }
            onChange={ this.onInput }
            type="text"
            placeholder="Enter your location. Ex. Ottawa, ON" />
          <button type="submit">Lookup</button>
        </form>
        <h3>Weather for: {this.props.locationName}</h3>
        </div>
      );
    }
  }
  
  class WeatherInfo extends React.Component {
    render() {
      const details = this.props.details;
  
      return (
          <div className="weather-info">
              <h3>{details.day} - {details.date}</h3>
              <div>
                  {details.text}
              </div>
          </div>
      );
    }
  }
  
  
  class App extends React.Component {
   constructor() {
      super();
      this.state = {
        data: [],
      };
  
      this.loadWeather = this.loadWeather.bind(this);
    };
  
  
    loadWeather(initialState) {
      this.setState({
        api_message: null,
        input: initialState,
        data: []
      });
  
      //https://developer.yahoo.com/weather/
      const query = encodeURIComponent(`select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${initialState}")`);
      const endpoint = `https://query.yahooapis.com/v1/public/yql?q=${query}&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
  
      return fetch(endpoint)
        .then((response) => {
          //Handle 400s and 500s
          if (response.status !== 200) {
            this.setState({ api_message: 'Invalid query yo.' });
            throw new Error('Network response was not ok.');
          }
          return response.json();
        })
        .then((responseJson) => {
          if (!responseJson.query.results) {
            this.setState({ api_message: 'Yahoo API returned nothing.' });
            return;
          }
  
          let json = responseJson.query.results.channel.item.forecast;
          this.setState({
            data: json,
            api_message: null
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  
    render() {
      return (
        <div className="App">
          <div className="App-header">
            <img src="https://upload.wikimedia.org/wikipedia/en/a/a7/React-icon.svg" className="App-logo" alt="logo" />
            <h2>Welcome to the React Weather Widget</h2>
          </div>
          <div className="App-intro">
            <h3 className="message" className="error">{this.state.api_message}</h3>
          </div>
          <Weather loadWeather={this.loadWeather} locationName={this.state.input}/>
          <div className="weather-box">
            {
              Object.keys(this.state.data).map(key =>
                <WeatherInfo key={key} index={key} details={this.state.data[key]} />)
            }
          </div>
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );