import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingTop: 10,
    paddingBottom: 10
  },
  row: {
    display: "flex",
    justifyContent: "center",
  }
});

function FormButton(props) {
  const { classes } = props;

  return (
    <div className={classes.row}>
      <Button
        variant="contained"
        size="large"
        color="primary"
        className={classes.root}
        onClick={props.handleValidation}
        // component={Link}
        // to={props.to}
      >
        {props.name}
      </Button>
    </div>
  );
}

FormButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormButton);
