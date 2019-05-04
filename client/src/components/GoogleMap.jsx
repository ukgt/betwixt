import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
// TODO: uncomment this line below 
import config from "../config.json";
import querySearch from "stringquery";
import Paper from "@material-ui/core/Paper";
import MediaCard from "../components/MediaCard";
import placeHolder from "../placeholder.png";
import Typography from "@material-ui/core/Typography";

import Slider from "../components/Slider";

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: { lat: 29.76328, lng: -95.36327 },
      error: "",
      markers: [],
      cards: [],
      params: querySearch(
        window.location.href.slice(window.location.href.indexOf("?"))
      )
    };

    this.Google = this.props.google;
    this.map = document.getElementsByClassName("map");
    this.geocoder = new this.Google.maps.Geocoder();
  }

  styles = {
    map: {
      width: "100%",
      height: "50%"
    },
    paper: {
      marginTop: 400,
      width: "90%",
      display: "flex",
      justifyContent: "center",
      overflow: "scroll"
    },
    container: {
      display: "flex",
      justifyContent: "center"
    }
  };

  findMidPoint = (mapProps, map) => {
    const { google } = mapProps;
    const service = new google.maps.places.PlacesService(map);
    this.geocoder.geocode(
      { address: this.state.params.from },
      (fromRes, fromStatus) => {
        if (fromStatus === "OK") {
          this.geocoder.geocode(
            { address: this.state.params.to },
            (toRes, toStatus) => {
              if (toStatus === "OK") {
                const firstLoc = fromRes[0].geometry.location;
                const secondLoc = toRes[0].geometry.location;
                const midPoint = this.Google.maps.geometry.spherical.interpolate(
                  firstLoc,
                  secondLoc,
                  0.5
                );
                this.setState(
                  {
                    center: midPoint
                  },
                  () => {
                    this.fetchPlaces(service);
                  }
                );
              } else {
                this.setState({ error: "Second Location Not Found" });
                console.log("Second Location Error: " + toStatus);
              }
            }
          );
        } else {
          this.setState({ error: "First Location Not Found" });
          console.log("First Location Error: " + fromStatus);
        }
      }
    );
  };

  fetchPlaces = service => {
    service.textSearch(
      {
        location: this.state.center,
        radius: "200",
        query: this.state.params.point
      },
      (res, status) => {
        if (status === "OK") {
          const newMarkers = [];
          const newCards = [];
          for (var i = 0; i < res.length; i++) {
            const data = res[i];
            const marker = data.geometry.location;
            newMarkers.push({ lat: marker.lat(), lng: marker.lng() });
            newCards.push({
              name: data.name,
              rating: data.rating,
              image: data.photos ? data.photos[0].getUrl() : placeHolder,
              address: data.formatted_address
            });
          }
          this.setState({ markers: newMarkers, cards: newCards });
        } else this.setState({ error: "No Results Found" });
      }
    );
  };

  render() {
    return (
      <>
        <Map
          google={this.Google}
          style={this.styles.map}
          className="map"
          initialCenter={this.state.center}
          center={this.state.center}
          zoom={12}
          onReady={this.findMidPoint}
        >
          {this.state.markers.map((marks, index) => {
            return <Marker key={index} position={marks} />;
          })}
        </Map>
        <div style={this.styles.container}>
          <Paper elevation={5} style={this.styles.paper}>
            {/* <Slider>
              {this.state.cards.map((card, index) => {
                return (
                  <MediaCard
                    key={index}
                    name={card.name}
                    image={card.image}
                    rating={card.rating}
                    address={card.address}
                  />
                );
              })}
            </Slider> */}
            {this.state.cards.length > 0 ? (
              this.state.cards.map((card, index) => {
                return (
                  <MediaCard
                    key={index}
                    name={card.name}
                    image={card.image}
                    rating={card.rating}
                    address={card.address}
                  />
                );
              })
            ) : (
              <Typography variant="subtitle1" align="center">
                {this.state.error}
              </Typography>
            )}
          </Paper>
        </div>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_mapsKey || config.mapsKey,
  libraries: ["geometry", "places"]
})(MapContainer);
