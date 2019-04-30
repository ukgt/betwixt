import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
// TODO: uncomment this line below 
// import config from "../config.json";
import querySearch from "stringquery";
import Paper from "@material-ui/core/Paper";
import MediaCard from "../components/MediaCard";
import placeHolder from "../placeholder.png"

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: { lat: 29.76328, lng: -95.36327 },
      markers: [],
      params: querySearch(this.props.location.search),
      cards: []
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
      width: "90%",
      position: "absolute",
      marginTop: 400,
      display: "flex",
      justifyContent: "center",
      overflow: "scroll"
    },
    container: { display: "flex", justifyContent: "center" }
  };

  // componentDidMount() {
  //   this.findMidPoint(this.state.params.from, this.state.params.to);
  // }

  // componentDidUpdate() {

  // }

  // addMarker = newMarkers => {
  //   this.setState({ markers: newMarkers });
  // };

  // findMidPoint = (from, to) => {
  //   this.geocoder.geocode({ address: from }, (fromRes, fromStatus) => {
  //     if (fromStatus === "OK") {
  //       this.geocoder.geocode({ address: to }, (toRes, toStatus) => {
  //         if (toStatus === "OK") {
  //           const firstLoc = fromRes[0].geometry.location;
  //           const secondLoc = toRes[0].geometry.location;
  //           const midPoint = this.Google.maps.geometry.spherical.interpolate(
  //             firstLoc,
  //             secondLoc,
  //             0.5
  //           );
  //           this.addMarker([firstLoc, secondLoc, midPoint]);
  //           this.setState({
  //             center: midPoint
  //           });
  //         } else alert("Second Location Error: " + toStatus);
  //       });
  //     } else alert("First Location Error: " + fromStatus);
  //   });
  // };

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
              } else alert("Second Location Error: " + toStatus);
            }
          );
        } else alert("First Location Error: " + fromStatus);
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
          const markers = [];
          const cards = [];
          for (var i = 0; i < res.length; i++) {
            const data = res[i];
            const marker = data.geometry.location;
            markers.push({ lat: marker.lat(), lng: marker.lng() });
            cards.push({
              name: data.name,
              rating: data.rating,
              image: data.photos ? data.photos[0].getUrl() : placeHolder,
              address: data.formatted_address
            });
          }
          this.setState({ markers: markers, cards: cards });
        }
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
          </Paper>
        </div>
      </>
    );
  }
}

// TODO: uncomment the code below
export default GoogleApiWrapper({
  // apiKey: config.mapsKey,
  libraries: ["geometry", "places"]
})(MapContainer);
