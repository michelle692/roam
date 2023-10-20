import LargePopup from './LargePopup.js';
import { citiesContext } from "../pages/Home.js";
import { React, useContext } from "react";
import Button from './Button.js';
import Item from './Item.js';

const textStyle = {
    marginLeft: "10rem",
}

const History = ({ openVal, closeVal, openVal2, closeVal2 }) => {
    const { citiesVisited, setCitiesVisited } = useContext(citiesContext);
    return (
        <LargePopup open={openVal} close={closeVal2}>
            <div>
                <span style={textStyle}>★ TRAVEL HISTORY</span>
                <Button val={openVal2} onClick={closeVal} offset={'1vh'}>ADD LOCATION</Button>
                {citiesVisited.map((val) => (
                    <Item date={val.date} city={val.city} country={val.country} note={val.note} lat={val.latitude} long={val.longitude} />
                ))}
            </div>
        </LargePopup>
    )
}

export default History;