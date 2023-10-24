import LargePopup from './largepopup.js';
import { citiesContext } from "../pages/Home.js";
import { React, useContext } from "react";
import Button from './button.js';
import Item from './item.js';

const textStyle = {
    marginLeft: "10rem",
}

const Wishlist = ({ openVal, closeVal, openVal2, closeVal2 }) => {
    const { citiesVisited, setCitiesVisited } = useContext(citiesContext);
    return (
        <LargePopup open={openVal} close={closeVal2}>
            <div>
                <span style={textStyle}>❤ TRAVEL WISHLIST</span>
                <Button val={openVal2} onClick={closeVal} offset={'1vh'}>ADD LOCATION</Button>
                {citiesVisited.map((val) => (
                    <Item date={val.date} city={val.city} country={val.country} note={val.note} lat={val.lat} long={val.lng} />
                ))}
            </div>
        </LargePopup>
    )
}
export default Wishlist;