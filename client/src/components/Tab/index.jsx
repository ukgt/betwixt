import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {
  DirectionsCar,
  DirectionsBus,
  DirectionsWalk,
  DirectionsBike
} from "@material-ui/icons";

const styles = theme => ({
  root: {
    flexGrow: 1,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: 36
  },

  tabsIndicator: {
    backgroundColor: "blue"
  },

  tabsRoot: {
    justifyContent: "center"
  }
});

class IconTabs extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root} elevation={5}>
        <Tabs
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
          value={this.state.value}
          onChange={this.handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            icon={<DirectionsCar />}
            label="CAR"
          />
          <Tab
            icon={<DirectionsBus />}
            label="BUS"
          />
          <Tab
            icon={<DirectionsWalk />}
            label="WALK"
          />
          <Tab
            icon={<DirectionsBike />}
            label="BIKE"
          />
        </Tabs>
      </Paper>
    );
  }
}

IconTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IconTabs);
