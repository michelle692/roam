import LargePopup from './LargePopup.js';
import { citiesContext } from "../pages/Home.js";
import { React, useContext } from "react";
import Button from './Button.js';
import Item from './Item.js';
import styled, { css } from 'styled-components';
import "@fontsource/overpass-mono";

const boxStyle = {
  display: "flex",
  flexDirection: "column"
}
const headerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between"
}
const textStyle = {
    marginLeft: "10rem",
  }
  const description = {
    fontSize: "1rem",
    fontWeight: "normal",
    position: "absolute",
    left: "50%",
    width: "70%",
    transform: 'translate(-50%, -50%)',
    marginTop: "10%",
  }  
  const StyledButton = styled.button`
  background: rgba(217, 217, 217, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: rgba(255, 255, 255, 0.8);
  display: inline-block;
  margin: 0.5rem 1rem;
  padding: 0.75rem 0;
  transition: all 200ms ease-in-out;
  width: 11rem;
  text-align: center;
  font-family: "Overpass Mono";

  &:hover {
      background: rgba(255, 255, 255, 0.35);
  }

  ${props => props.val && css`
      background: rgba(255, 255, 255, 1);
      color: black;
      mix-blend-mode: screen;
  `}
`
const History = ({openVal, closeVal, openVal2, closeVal2}) => {
    const {citiesVisited} = useContext(citiesContext);
    return (
        <LargePopup open={openVal} close={closeVal2}>
          <div style={boxStyle}>
          <div style={headerStyle}>
          <span style={textStyle}>★ TRAVEL HISTORY</span>
          <StyledButton val={openVal2} onClick={closeVal} offset={'1vh'}>ADD LOCATION</StyledButton>
          </div>
          {citiesVisited.length > 0 ? citiesVisited.map((val) => (
            <Item date={val.date} city={val.city} country={val.country} note={val.note} lat={val.lat} long={val.lng}/>
          )) : <em style={description}>You have no cities in your history. Add a city using the "Add Location" button in the upper right.</em>}
        </div>
      </LargePopup>
    )
}

export default History;