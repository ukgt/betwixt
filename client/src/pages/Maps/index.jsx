import React from "react";
import Map from "../../components/GoogleMap";


export default function Maps(props) {
  return (
    <>
      <div style={{position: "static"}}>
        <Map
          {...props}
        />
      </div>
    </>
  );
}
