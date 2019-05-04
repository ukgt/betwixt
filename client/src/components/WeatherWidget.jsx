import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import LeftArrow from "@material-ui/icons/KeyboardArrowLeftRounded";

const styles = {
  root: {
    flexGrow: 1,
  },
  backButton: {
    flexGrow: 1,
  },
  weatherContainer: {}
};

function WeatherWidget(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <div className={classes.backButton}>
          <IconButton color="inherit" aria-label="Main Page"  component={Link} to="/">
            <LeftArrow fontSize="large"/>
          </IconButton>
          </div>
          <Button variant="outlined" color="primary" component={Link} to="/weather">Weather Placeholder</Button>
        </Toolbar>

      </AppBar>
    </div>
  );
}

WeatherWidget.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WeatherWidget);
