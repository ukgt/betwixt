import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import querySearch from "stringquery";
import Paper from "@material-ui/core/Paper";
import MediaCard from "../components/MediaCard";
import placeHolder from "../placeholder.png";
import Typography from "@material-ui/core/Typography";
import Slider from "../components/Slider";
import Modal from "../components/Modal";
import dotenv from "dotenv";
dotenv.config();

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origins: { first: {}, second: {} },
      center: { lat: 29.76328, lng: -95.36327 },
      error: "",
      markers: [],
      cards: [],
      currentCard: 0,
      modal: false,
      params: querySearch(
        window.location.href.slice(window.location.href.indexOf("?"))
      )
    };

    this.Google = this.props.google;
    this.map = document.getElementsByClassName("map");
    this.geocoder = new this.Google.maps.Geocoder();
    this.distance = new this.Google.maps.DistanceMatrixService();
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
                    origins: {
                      from: fromRes[0].geometry.location,
                      to: toRes[0].geometry.location
                    },
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
          const data = [];
          for (var i = 0; i < res.length; i++) {
            const marker = res[i].geometry.location;
            data.push({
              marker: { lat: marker.lat(), lng: marker.lng() },
              name: res[i].name,
              rating: res[i].rating,
              image: res[i].photos ? res[i].photos[0].getUrl() : placeHolder,
              address: res[i].formatted_address
            });
          }
          this.fetchDistance(data);
        } else this.setState({ error: "No Results Found" });
      }
    );
  };

  fetchDistance = data => {
    const addresses = [];
    data.forEach(d => addresses.push(d.address));
    this.distance.getDistanceMatrix(
      {
        origins: [this.state.params.from, this.state.params.to],
        destinations: addresses,
        travelMode: this.state.params.mode,
        unitSystem: this.Google.maps.UnitSystem.IMPERIAL
      },
      res => {
        for(let i = 0; i < res.rows[0].elements.length; i++) {
          data[i].distanceA = res.rows[0].elements[i].distance.text;
          data[i].durationA = res.rows[0].elements[i].duration.text;
        }

        for(let i = 0; i < res.rows[1].elements.length; i++) {
          data[i].distanceB = res.rows[1].elements[i].distance.text;
          data[i].durationB = res.rows[1].elements[i].duration.text;
        }
        this.createCards(data)
      }
    );
  };

  createCards = data => {
    const newMarkers = [];
    const newCards = [];
    data.forEach(d => {
      newMarkers.push({ lat: d.marker.lat, lng: d.marker.lng });
      newCards.push({
        name: d.name,
        rating: d.rating,
        image: d.image,
        address: d.address,
        distanceA: d.distanceA,
        distanceB: d.distanceB,
        durationA: d.durationB,
        durationB: d.durationB,
      });
    });
    this.setState({ markers: newMarkers, cards: newCards });
  };

  handleModalOpen = id => {
    this.setState({currentCard: id}, this.setState({ modal: true }))
    ;
  };

  handleModalClose = () => {
    this.setState({ modal: false });
  };

  render() {
    return (
      <>
        <Modal open={this.state.modal} card={this.state.cards.length > 0 ? this.state.cards[this.state.currentCard] : {}} handleClose={this.handleModalClose}/>
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
                    listId={index}
                    name={card.name}
                    image={card.image}
                    rating={card.rating}
                    address={card.address}
                    handleClick={this.handleModalOpen}
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
  apiKey: process.env.REACT_APP_mapsKey || process.env.REACT_APP_LOCAL_MAPS_KEY,
  libraries: ["geometry", "places", "directions"]
})(MapContainer);
