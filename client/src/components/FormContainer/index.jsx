import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: 36
  },
  row: {
    margin: 30
  }
});

function FormContainer(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root} elevation={1}>
      <form>
        {props.children.map(child => {
          return <div className={classes.row}>{child}</div>;
        })}
      </form>
    </Paper>
  );
}

FormContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormContainer);
