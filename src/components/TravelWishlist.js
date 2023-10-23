import LargePopup from './LargePopup.js';
import { citiesContext } from "../pages/Home.js";
import { React, useContext } from "react";
import Button from './Button.js';
import Item from './Item.js';

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

const Wishlist = ({openVal, closeVal, openVal2, closeVal2}) => {
    const {citiesVisited, wishlist} = useContext(citiesContext);
    return (
        <LargePopup open={openVal} close={closeVal2}>
        <div>
          <span style={textStyle}>❤ TRAVEL WISHLIST</span>
          <Button val={openVal2} onClick={closeVal} offset={'1vh'}>ADD LOCATION</Button>
          {wishlist.length > 0 ? wishlist.map((val) => (
            <Item date={val.date} city={val.city} country={val.country} note={val.note} lat={val.lat} long={val.lng}/>
          )) : <em style={description}>You have no cities in your wishlist. Add a city using the "Add Location" button in the upper right.</em>}
        </div>
      </LargePopup>
    )
}
export default Wishlist;