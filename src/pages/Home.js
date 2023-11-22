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
import LoginPopup from '../components/LoginPopup.js'
import UserButton from '../components/UserButton'
import { RoamContext } from '../utils/roamContext.js';

import { useContext } from "react";

function Home() {
    const navigate = useNavigate()
    const { citiesVisited, wishlist, cityCount, stateCount, countryCount, continentCount } = useContext(RoamContext);
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
    const [loginOpen, setLoginOpen] = useState(false);

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

    const handleAddLocation = () => {
        setButton1([!button1[0], button1[1], button1[2]]);
    }
    const handleOpenWishlist = () => {
        setButton1([false, !button1[1], false]);
        setOutputArr(false);
    }

    const handleOpenHistory = () => {
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

    const handleLoginPopup = () => {
        setLoginOpen(!loginOpen)
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
            <UserButton onClick={handleLoginPopup} />
            <LoginPopup open={loginOpen} close={handleLoginPopup}/>

            <Button val={button1[0]} onClick={handleAddLocation} offset={'25vh'}>ADD LOCATION</Button>
            <Button val={button1[1]} onClick={handleOpenWishlist} offset={'calc(25vh + 50px)'}>TRAVEL WISHLIST</Button>
            <Button val={button1[2]} onClick={handleOpenHistory} offset={'calc(25vh + 100px)'}>TRAVEL HISTORY</Button>

            <Wishlist openVal={button1[1]} closeVal={handleAddLocation} openVal2={button1[0]} closeVal2={handleClick4} />
            <History openVal={button1[2]} closeVal={handleAddLocation} openVal2={button1[0]} closeVal2={handleClick4} />
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