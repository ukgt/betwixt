import React from "react";
import Map from "../../components/GoogleMap";
import Stepper from "../../components/Stepper";

export default function Maps(props) {
  return (
    <>
      <div style={{position: "static"}}>
        <Map
          {...props}
          // locationA={this.state.locationA}
          // locationB={this.state.locationB}
        //   style={this.styles}
        />
      </div>
    </>
  );
}
