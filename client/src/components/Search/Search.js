import React from 'react';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import { cyan500 } from 'material-ui/styles/colors';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  span {
    font-size: 12px;
  }
`;

const LocationBtn = styled.button`
  position: relative;
  padding: 0;
  font: inherit;
  background-color: white;
  border: none;
  outline: none;
  cursor: pointer;
  ::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #000;
    visibility: hidden;
    transform: scaleX(0);
    transition: all .2s ease-in-out;
  }
  :hover::after {
    visibility: visible;
    transform: scaleX(1);
  }
  :active {
    color: ${cyan500};
  }
  :active::after {
    transition: none;
    background-color: ${cyan500};
  }
`;

const Search = (props) => {
  return (
    <Wrapper>
      <form onSubmit={props.getForecastByCity}>
        <TextField
          hintText="City"
          value={props.city}
          onChange={(e) => props.textChanged(e.target.value)}
        />
      </form>
      <br />
      <span>or</span>
      <LocationBtn onClick={props.getForecastByCoordinates}>your current location</LocationBtn>
    </Wrapper>
  );
}

export default Search;