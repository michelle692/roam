import LargePopup from './components/largepopup.js';
import { citiesContext } from "./App.js";
import {React, useContext} from "react";
import Button from './components/button.js';
import Item from './components/item.js';

const textStyle = {
    marginLeft: "10rem",
  }

const Wishlist = ({openVal, closeVal, openVal2, closeVal2}) => {
    const {citiesVisited, setCitiesVisited} = useContext(citiesContext);
    return (
        <LargePopup open={openVal} close={closeVal2}>
        <div>
          <span style={textStyle}>❤ TRAVEL WISHLIST</span>
          <Button val={openVal2} onClick={closeVal} offset={'1vh'}>ADD LOCATION</Button>
          {citiesVisited.map((val) => (
            <Item date={val.date} city={val.city} country={val.country} note={val.note} lat={val.latitude} long={val.longitude}/>
          ))}
        </div>
      </LargePopup>
    )
}
export default Wishlist;