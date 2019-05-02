<<<<<<< HEAD
import React, { Component } from "react";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
  }

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
=======
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styled from 'styled-components';
import Search from './Search/Search';
import Error from './Error/Error';
import Forecast from '../containers/Forecast/Forecast'


const Application = styled.div`
  text-align: center;
  height: 100vh;
  width: 1000px;
  margin: 0 auto;
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const Card = styled.div`
  position: relative;
  top: 50%;
  margin-top: -300px;
  height: 600px;
  background-color: white;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, .25);
  @media (max-width: 1000px) {
    top: 0;
    margin-top: 0;
    box-shadow: none;
  }
`;

const apiKey = 'dbb624c32c7f0d652500552c5ebbde56';

class Weather extends Component {
  state = {
    city: '',
    forecast: null,
    error: {
      state: false,
      message: ''
    }
  }

  getForecastByCity = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${this.state.city}&units=imperial&cnt=8&appid=${apiKey}`);
      const json = await response.json();
      if (json.cod !== '200') {
        this.setState({ error: { state: true, message: json.message } });
      } else {
        this.setState({ forecast: json.list });
      }
    } catch (error) {
      this.setState({ error: { state: true } });
    }
  }

  getUserLocation = async () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      });
    });
  }

  getForecastByCoordinates = async () => {
    try {
      const coords = await this.getUserLocation();
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${coords.lat}&lon=${coords.lon}&units=imperial&cnt=8&appid=${apiKey}`);
      const json = await response.json();
      if (json.cod !== '200') {
        this.setState({ error: { state: true } });
      } else {
        this.setState({ city: json.city.name, forecast: json.list });
      }
    } catch (error) {
      this.setState({ error: { state: true } });
    }
  }

  handleCityInput = (city) => {
    this.setState({ city });
  }

  clear = () => {
    this.setState({ city: '', forecast: null, error: { state: false } });
  }

  changeUnit = (currentTempUnit) => {
    const updatedForecast = [...this.state.forecast];
    updatedForecast.forEach(day => {
      Object.keys(day.temp).forEach(key => {
        day.temp[key] = currentTempUnit === 'F' ? 9 / 5 * day.temp[key] + 32 : 5 / 9 * (day.temp[key] - 32);
      });
    });

    this.setState({ forecast: updatedForecast });
  }

  render() {
    const cardContent = this.state.forecast
      ? <Forecast
        back={this.clear}
        forecast={this.state.forecast}
        city={this.state.city}
        changeUnit={this.changeUnit}
      />
      : <Search
        getForecastByCity={this.getForecastByCity}
        getForecastByCoordinates={this.getForecastByCoordinates}
        textChanged={this.handleCityInput}
        city={this.state.city}
      />;

    return (
      <MuiThemeProvider>
        <Application>
          <Card>
            {!this.state.error.state ? cardContent : <Error back={this.clear} message={this.state.error.message} />}
          </Card>
        </Application>
      </MuiThemeProvider>
    );
  }
}

export default Weather;
>>>>>>> fe3754ebcae92eb391baf43eea1343dfeafc96b9
