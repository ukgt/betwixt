import React, { Component } from "react";
import "./slider.css";

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      property: null
    };
  }

  componentWillReceiveProps() {
      console.log("will receive")
      console.log(this.props)
    if (this.props.children.length > 0) {
        console.log("received")
      this.setState({
        properties: this.props.children,
        property: this.props.children[0]
      });
    }
  }

  nextProperty = () => {
    const newIndex = this.state.property.props.key + 1;
    this.setState({
      property: this.props.properties[newIndex]
    });
  };

  prevProperty = () => {
    const newIndex = this.state.property.props.key - 1;
    this.setState({
      property: this.props.properties[newIndex]
    });
  };

  render() {
    if (this.state.properties === [] || this.state.property === null) {
      return <div />
    }
    const { properties, property } = this.state;
    return (
      <div className="App">
        <button
          onClick={() => this.nextProperty()}
          disabled={property.props.key === properties.length - 1}
        >
          Next
        </button>
        <button
          onClick={() => this.prevProperty()}
          disabled={property.props.key === 0}
        >
          Prev
        </button>

        <div className="page">
          <div className="col">
            {/* <div className={`cards-slider active-slide-${property.index}`}> */}
            {/* <div className="cards-slider-wrapper" style={{
                      'transform': `translateX(-${property.index*(100/properties.length)}%)`
                    }}> */}
            {this.props.children.map((card, index) => {
              return card;
            })}
            {console.log(this.props.children)}
          </div>
        </div>
      </div>

      // </div>
      //   </div>
    );
  }
}
