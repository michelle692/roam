import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Globe from 'react-globe.gl';
import './../css/App.css';
import { GetInfo, Search } from './../utils/api';

import Button from '../components/Button';
import LocationPopup from '../components/LocationPopup.js';
import Wishlist from '../components/TravelWishlist.js';
import History from '../components/TravelHistory.js';
import Info from '../components/Info.js';
import Stats from '../components/Stats.js';

import { createContext, useContext } from "react";

export const citiesContext = createContext({
    citiesVisited: [{
        date: "10/17/23",
        city: "Atlanta",
        country: "United States",
        note: "Visited the Georgia Tech Campus",
        lat: 33.47,
        lng: -84.20
    },
    {
        date: "9/04/22",
        city: "Madrid",
        country: "Spain",
        note: "Visited my family to celebrate a birthday!",
        lat: 40.42,
        lng: -3.7
    }],
    wishlist: [],
    cityCount: 91,
    stateCount: 14,
    countryCount: 21,
    continentCount: 2
}
)

function Home() {
    const navigate = useNavigate()
    const { citiesVisited, wishlist, cityCount, stateCount, countryCount, continentCount } = useContext(citiesContext);
    const [points, setPoints] = useState(citiesVisited);
    const mainGlobe = useRef();
    const [button1, setButton1] = useState([false, false, false]);
    const [locInput, setLocInput] = useState("");
    const [outputArr, setOutputArr] = useState(true);
    const [infoBox, setInfoBox] = useState(false);
    const [infoCoords, setInfoCoords] = useState({
        lat: 0,
        lng: 0
    });
    const [statsOpen, setStatsOpen] = useState(true);

    const openStats = () => {
        setStatsOpen(!statsOpen);
    }

    useEffect(() => {
        const globe = mainGlobe.current;

        globe.controls().autoRotate = !infoBox;
        globe.controls().autoRotateSpeed = 0.35;
    }, [infoBox])

    function clickLabel(lat, lng) {
        mainGlobe.current.pointOfView({ lat: lat, lng: lng, altitude: .5 }, 1600);
        setInfoBox(true);
        setInfoCoords({lat:lat, lng:lng});
        console.log(infoCoords.lat);
    }

    const handleClick1 = () => {
        setButton1([!button1[0], button1[1], button1[2]]);
    }
    const handleClick2 = () => {
        setButton1([false, !button1[1], false]);
        setOutputArr(false);
    }

    const handleClick3 = () => {
        setButton1([false, false, !button1[2]]);
        setOutputArr(true);
    }

    const handleClick4 = () => {
        setButton1([false, false, false]);
        setOutputArr(true);
    }

    const handleClick5 = () => {
        setInfoBox(false);
        mainGlobe.current.pointOfView({ lat: infoCoords.lat, lng: infoCoords.lng, altitude: 2 }, 1600);
    }

    const handleDate = (date) => {
        let year= date.getFullYear(); 
        let month = String(date.getMonth()+1).padStart(2,"0");
        let day= String(date.getDate()).padStart(2, '0');
        return month + "/" + day + "/" + year;
    }

    const handleLocSubmit = () => {
        Search(locInput).then((searchData) => {
            const place_id = searchData["predictions"][0]["place_id"]
            GetInfo(place_id).then((place_json) => {
                let place = place_json["results"][0];
                let lat = place["geometry"]["location"]["lat"]
                let lng = place["geometry"]["location"]["lng"]
                let city = place["address_components"][0]["short_name"]
                let country = "Country Not Found";
                for (let i = 0; i < place["address_components"].length; i ++){
                    if (place["address_components"][i]["types"].includes("country")){
                        country = place["address_components"][i]["long_name"];
                        break;
                    }
                }
                const newCity = {
                    date: handleDate(new Date()),
                    city: city,
                    country: country,
                    note: "Note Goes Here",
                    lat: lat,
                    lng: lng
                };
                if (outputArr){
                    citiesVisited.push(newCity);
                    setPoints(citiesVisited);
                }else{
                    wishlist.push(newCity);
                    setPoints(wishlist);
                }
                
                mainGlobe.current.pointOfView({ lat: lat, lng: lng, altitude: .5 }, 1600)
                setButton1([false, false, false]);
            }).catch((error) => {
                console.log("unable to get info for ", place_id);
            })
        }).catch((error) => {
            console.log("unable to search ", locInput);
        })
    }


    const changeLocVal = (event) => {
        setLocInput(event.target.value)
    }

    return (
        <div>
            <Link className="Title" to="/information">ROAM</Link>
            <Globe
                ref={mainGlobe}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                backgroundColor="rgba(0,0,0,0)"
                atmosphereColor={'white'}
                atmosphereAltitude="0.3"
                labelsData={points}
                labelLat={d => d.lat}
                labelLng={d => d.lng}
                labelText={d => d.city}
                labelSize={0.85}
                labelColor={() => 'yellow'}
                labelIncludeDot={true}
                labelDotRadius={0.7}
                onLabelClick={(label, event, { lat, lng, altitude }) => clickLabel(label.lat, label.lng)}
            />

            <Button val={button1[0]} onClick={handleClick1} offset={'25vh'}>ADD LOCATION</Button>
            <Button val={button1[1]} onClick={handleClick2} offset={'calc(25vh + 50px)'}>TRAVEL WISHLIST</Button>
            <Button val={button1[2]} onClick={handleClick3} offset={'calc(25vh + 100px)'}>TRAVEL HISTORY</Button>

            <Wishlist openVal={button1[1]} closeVal={handleClick1} openVal2={button1[0]} closeVal2={handleClick4} />
            <History openVal={button1[2]} closeVal={handleClick1} openVal2={button1[0]} closeVal2={handleClick4} />
            <LocationPopup open={button1[0]} close={handleClick4} onChange={changeLocVal} submit={handleLocSubmit} type={outputArr ? "PIN CITY" : "WISHLIST"}>ADD LOCATION</LocationPopup>
            {infoBox ? citiesVisited.map((val) => (
                    <div>   
                    {val.lat === infoCoords.lat && val.lng === infoCoords.lng ? <Info city={val.city} country={val.country} date={val.date} note={val.note} lat={val.lat} lng={val.lng} 
                    open={infoBox} close={handleClick5}/> : <div/>}
                    </div>
            )) : <div/>}
            <Stats cityCount={cityCount} stateCount={stateCount} countryCount={countryCount} continentCount={continentCount} visible={statsOpen} open={openStats}/>
        </div>
    )
}
export default Home;