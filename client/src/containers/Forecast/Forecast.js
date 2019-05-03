import React, { Component } from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Toggle from 'material-ui/Toggle';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  text-align: left;
`;

const Menu = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 40px;
  @media (max-width: 700px) {
    margin-bottom: 20px;
  }
`;

const City = styled.h1`
  margin: 0;
  text-transform: capitalize;
`;

const ToggleStyles = {
  width: 'auto',
  marginLeft: 'auto'
};

const DateRow = styled.div`
  width: 100%;
  margin-left: 20px;
`;

const CurrentDate = styled.h2`
  margin: 0;
`;

const WeatherType = styled.h3`
  margin: 0;
  font-weight: normal;
  text-transform: capitalize;
`;

const Weather = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  @media (max-width: 700px) {
    flex-direction: column;
  }
  i {
    font-size: 120px;
    margin-top: -30px;
    @media (max-width: 700px) {
      font-size: 70px;
    }
  }
`;

const Temperature = styled.h1`
  font-size: 120px;
  margin-right: 70px;
  @media (max-width: 700px) {
    font-size: 70px;
    margin: 30px 0;
  }
`;

const Daily = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  width: 125px;
  margin-left: 70px;
  @media (max-width: 700px) {
    margin: 20px 0;
  }
  li {
    display: flex;
    justify-content: space-between;
  }
  p {
    margin: 5px 0;
    font-size: 18px;
  }
`;

const Weekly = styled.ul`
  margin: 0;
  padding: 0 20px;
  list-style: none;
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 700px) {
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0;
  }
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h3 {
    margin: 0;
    margin-bottom: 15px;
    @media (max-width: 700px) {
      font-size: 15px;
    }
  }
  i {
    font-size: 40px;
    margin-bottom: 15px;
    @media (max-width: 700px) {
      font-size: 30px;
      margin-bottom: 0;
    }
  }
`;

class Forecast extends Component {
  state = {
    tempUnit: 'F'
  }

  getDay = (index) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[index];
  }

  getDateString = (seconds) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date(seconds * 1000);
    return `${this.getDay(date.getDay())}, ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
  }

  getCurrentTemp = (temps) => {
    const hours = new Date(Date.now()).getHours();

    if (hours >= 6 && hours < 12) {
      return Math.round(temps.morn);
    } else if (hours >= 12 && hours < 18) {
      return Math.round(temps.day);
    } else if (hours >= 18 && hours < 24) {
      return Math.round(temps.eve);
    } else {
      return Math.round(temps.night);
    }
  }

  isDay = () => {
    const hours = new Date(Date.now()).getHours();
    return hours >= 7 && hours <= 20 ? true : false;
  }

  changeTempUnit = () => {
    const updatedTempUnit = this.state.tempUnit === 'C' ? 'F' : 'C';
    this.setState({ tempUnit: updatedTempUnit });
    this.props.changeUnit(updatedTempUnit);
  }

  render() {
    const today = this.props.forecast[0];

    return (
      <Wrapper>
        <Menu>
          <IconButton onClick={this.props.back}>
            <SvgIcon>
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z" />
            </SvgIcon>
          </IconButton>
          <City>{this.props.city}</City>
          <Toggle
            onToggle={this.changeTempUnit}
            label={`Change to °${this.state.tempUnit === 'F' ? 'C' : 'F'}`}
            labelStyle={{ whiteSpace: 'nowrap' }}
            style={ToggleStyles}
          />
        </Menu>
        <DateRow>
          <CurrentDate>{this.getDateString(today.dt)}</CurrentDate>
          <WeatherType>{today.weather[0].description}</WeatherType>
        </DateRow>
        <Weather>
          <Temperature>{`${this.getCurrentTemp(today.temp)}°${this.state.tempUnit}`}</Temperature>
          <i className={`wi wi-owm-${this.isDay() ? 'day' : 'night'}-${today.weather[0].id}`}></i>
          <Daily>
            <li>
              <p>Morning</p>
              <p>{`${Math.round(today.temp.morn)}°${this.state.tempUnit}`}</p>
            </li>
            <li>
              <p>Day</p>
              <p>{`${Math.round(today.temp.day)}°${this.state.tempUnit}`}</p>
            </li>
            <li>
              <p>Evening</p>
              <p>{`${Math.round(today.temp.eve)}°${this.state.tempUnit}`}</p>
            </li>
            <li>
              <p>Night</p>
              <p>{`${Math.round(today.temp.night)}°${this.state.tempUnit}`}</p>
            </li>
          </Daily>
        </Weather>
        <Weekly>
          {this.props.forecast.slice(1).map(day => (
            <li key={day.dt}>
              <h3>{this.getDay(new Date(day.dt * 1000).getDay())}</h3>
              <i className={`wi wi-owm-${day.weather[0].id}`}></i>
              <p>{`${Math.round(Object.values(day.temp).reduce((sum, current) => sum + current) / Object.values(day.temp).length)}°${this.state.tempUnit}`}</p>
            </li>
          ))}
        </Weekly>
      </Wrapper>
    );
  }
}

export default Forecast;