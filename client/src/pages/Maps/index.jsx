import React from "react";
import Map from "../../components/GoogleMap";
import Weather from "../../components/WeatherWidget";
import WeatherWidget from "../../components/WeatherWidget";

export default function Maps(props) {
  return (
    <div style={{ position: "static" }}>
      <WeatherWidget />
      <Map />
    </div>
  );
}
