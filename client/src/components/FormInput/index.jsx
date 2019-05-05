import React from "react";
import TextField from "@material-ui/core/TextField";

export default function FormInput(props) {
  return (
    <TextField
      error={props.error}
      name={props.name}
      onChange={props.handleChange}
      placeholder={props.placeholder}
      id={props.placeholder}
      type="text"
      fullWidth
      margin="normal"
      label={props.error ? "Field must not be empty" : ""}
      InputLabelProps={{
        shrink: true
      }}
    />
  );
}
