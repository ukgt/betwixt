import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

export default function FormInput(props) {
  return (
    <TextField
      name={props.name}
      onChange={props.handleChange}
      placeholder={props.placeholder}
      id={props.placeholder}
      type="text"
      className="validate"
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true
      }}
    />
  );
}
