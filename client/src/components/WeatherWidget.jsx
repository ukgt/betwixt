import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import LeftArrow from "@material-ui/icons/KeyboardArrowLeftRounded";
import renderEmpty from "antd/lib/config-provider/renderEmpty";

const styles = {
  root: {
    flexGrow: 1
  },
  backButton: {
    flexGrow: 1
  },
  weatherContainer: {}
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
      error: false
    };
  }
  componentDidMount() {
    this.getWeather();
  }

  getWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${33.749}&lon=${-84.388}&units=imperial&cnt=8&appid=${apiKey}`
      );
      const json = await response.json();
      if (json.cod !== "200") {
        this.setState({ error: true });
      } else {
        this.setState({
          city: json.city.name,
          degrees: Math.round((json.list[0].temp.max + json.list[0].temp.min) / 2),
          weather: json.list[0].weather[0].main
        });
      }
    } catch (error) {
      this.setState({ error: true });
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
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to="/weather"
            >
              {this.state.city}
              {this.state.degrees}
              {this.state.weather}
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
