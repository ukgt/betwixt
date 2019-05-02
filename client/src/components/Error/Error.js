import React from 'react';
import styled from 'styled-components';
import { cyan500 } from 'material-ui/styles/colors';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 10px;
  p {
    text-transform: capitalize;
  }
`;

const BackBtn = styled.button`
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
    visibility: visible;
    transform: scaleX(1);
    transition: all .2s ease-in-out;
  }
  :hover::after {
    visibility: hidden;
    transform: scaleX(0);
  }
  :active {
    color: ${cyan500};
  }
`;

const Error = (props) => (
  <Wrapper>
    <p>{!props.message ? 'Oops! Something went wrong.' : props.message + '.'}</p>
    <BackBtn onClick={props.back}>Back</BackBtn>
  </Wrapper>
);


export default Error;