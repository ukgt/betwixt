import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

export default function FormInput(props) {
  return (
    <TextField
      placeholder={props.placeholder}
      id={props.placeholder}
      type="text"
      className="validate"
      //style={{ marginLeft: 13, marginRight: 13 }}
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true
      }}
    />
  );
}
