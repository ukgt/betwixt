import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { loadCSS } from "fg-loadcss/src/loadCSS";

import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import LeftArrow from "@material-ui/icons/KeyboardArrowLeftRounded";

const styles = {
  root: {
    flexGrow: 1
  },
  backButton: {
    flexGrow: 1
  },
  weatherIcon: {
    paddingLeft: 10,
    paddingRight: 5
  },
  weatherLabel: {
    textAlign: "right"
  },
  weatherCity: {
    fontSize: 18
  }
};

const apiKey =
  process.env.REACT_APP_weatherKey || process.env.REACT_APP_LOCAL_WEATHER_KEY;

class WeatherWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: null,
      degrees: null,
      weather: null,
      description: null,
      icon: null,
      standby: true,
      error: ""
    };
  }
  componentDidUpdate() {
    if (this.props.getWeather && this.state.standby) {
      this.setState({standby: false})
      this.getWeather();
      loadCSS(
        "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
        document.querySelector("#insertion-point-jss")
      );
    }
  }

  getWeather = async () => {
    const { center } = this.props;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${center.lat()}&lon=${center.lng()}&units=imperial&cnt=8&appid=${apiKey}`
      );
      const json = await response.json();
      if (json.cod !== "200") {
        console.log(json.message)
        this.setState({ error: json.message });
      } else {
        console.log(json);
        this.setState({
          city: json.city.name,
          icon: `wi wi-owm-${json.list[0].weather[0].id}`,
          description: json.list[0].weather[0].description,
          degrees: Math.round(
            (json.list[0].temp.max + json.list[0].temp.min) / 2
          )
        });
      }
    } catch (error) {
      this.setState({ error: error });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <div className={classes.backButton}>
              <IconButton
                color="inherit"
                aria-label="Main Page"
                component={Link}
                to="/"
              >
                <LeftArrow fontSize="large" />
              </IconButton>
            </div>
            <Button color="primary" component={Link} to="/weather">
              <div className={classes.weatherLabel}>
                <div className={classes.weatherCity}>{this.state.city}</div>
                <div>{this.state.description}</div>
              </div>
              <div className={classes.weatherLabel}>
                <Icon className={classes.weatherIcon + " " + this.state.icon} />
                <div>{this.state.degrees + "°F"}</div>
              </div>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

WeatherWidget.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WeatherWidget);
