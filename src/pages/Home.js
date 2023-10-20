import React, { useState, useEffect, useRef } from 'react';

import Globe from 'react-globe.gl';
import './../css/App.css';
import { Search } from './../utils/api';

import Button from '../components/Button.js';
import LocationPopup from '../components/LocationPopup.js';
import Wishlist from '../components/TravelWishlist.js';
import History from '../components/TravelHistory.js';
import { createContext, useContext } from "react";

export const citiesContext = createContext({
    citiesVisited: [{
        date: "10/17/23",
        city: "Atlanta",
        country: "United States",
        note: "Visited the Georgia Tech Campus",
        latitude: 50,
        longitude: -50
    },
    {
        date: "9/04/22",
        city: "Madrid",
        country: "Spain",
        note: "Visited my family to celebrate a birthday!",
        latitude: 50,
        longitude: -50
    }],
    setCitiesVisited: {}
}
)

function Home() {
    const { useEffect, useRef } = React;
    const { citiesVisited, setCitiesVisited } = useContext(citiesContext);
    const [points, setPoints] = useState([]);
    const mainGlobe = useRef();
    const [button1, setButton1] = useState([false, false, false]);
    const [locInput, setLocInput] = useState("")

    useEffect(() => {
        const globe = mainGlobe.current;

        globe.controls().autoRotate = true;
        globe.controls().autoRotateSpeed = 0.35;
    })

    function clickLabel(lat, lng) {
        mainGlobe.current.pointOfView({ lat: lat, lng: lng, altitude: .5 }, 1600)
    }

    const handleClick1 = () => {
        setButton1([!button1[0], button1[1], button1[2]]);
    }
    const handleClick2 = () => {
        setButton1([false, !button1[1], false]);
    }

    const handleClick3 = () => {
        setButton1([false, false, !button1[2]]);
    }

    const handleClick4 = () => {
        setButton1([false, false, false]);
    }
    const textStyle = {
        marginLeft: "10rem",
    }

    const handleLocSubmit = () => {
        setButton1([false, false, false]);
        console.log(locInput)
        let coords = locInput.split(",")
        let lat = Number.parseFloat(coords[0])
        let lng = Number.parseFloat(coords[1])
        points.push({
            lng: lng,
            lat: lat,
            size: Math.random() / 3,
            color: 'green',
            name: lat.toString() + ", " + lng.toString()
        })
        setPoints(points)
        mainGlobe.current.pointOfView({ lat: lat, lng: lng, altitude: .5 }, 1600)
        citiesVisited.push({
            date: "xx/xx/xxxx",
            city: "City",
            country: "Country",
            note: "Note Goes Here",
            latitude: lat,
            longitude: lng
        });
    }

    const changeLocVal = (event) => {
        setLocInput(event.target.value)
        // Try uncommenting the following line and open up the console 
        // to see what is being returned when you type something in the text field.
        // Search(event.target.value).then((result) => { console.log(result); })
    }

    return (
        <div>
            <Globe
                ref={mainGlobe}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                backgroundColor="rgba(0,0,0,0)"
                atmosphereColor={'white'}
                atmosphereAltitude="0.3"
                labelsData={points}
                labelLat={d => d.lat}
                labelLng={d => d.lng}
                labelText={d => d.name}
                labelSize={0.85}
                labelColor={() => 'yellow'}
                labelIncludeDot={true}
                labelDotRadius={0.7}
                onLabelClick={(label, event, { lat, lng, altitude }) => clickLabel(lat, lng)}
            />

            <Button val={button1[0]} onClick={handleClick1} offset={'25vh'}>ADD LOCATION</Button>
            <Button val={button1[1]} onClick={handleClick2} offset={'calc(25vh + 50px)'}>TRAVEL WISHLIST</Button>
            <Button val={button1[2]} onClick={handleClick3} offset={'calc(25vh + 100px)'}>TRAVEL HISTORY</Button>

            <Wishlist openVal={button1[1]} closeVal={handleClick1} openVal2={button1[0]} closeVal2={handleClick4} />
            <History openVal={button1[2]} closeVal={handleClick1} openVal2={button1[0]} closeVal2={handleClick4} />
            <LocationPopup open={button1[0]} close={handleClick4} onChange={changeLocVal} submit={handleLocSubmit}>ADD LOCATION</LocationPopup>
        </div>
    )
}

export default Home;