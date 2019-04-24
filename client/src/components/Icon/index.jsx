import React from "react";
import './style.css'

export default function Icon(props) {
  return (
    <a className="btn-flat btn-large teal">
      <i
        className={`material-icons ${props.color ||
          "text-darken-4 grey"}-text ${props.size || "medium"}`}
      >
        {props.icon}
      </i>
    </a>
  );
}
