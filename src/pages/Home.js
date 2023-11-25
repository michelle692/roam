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

import { AddHistory, AddWishlist } from "../utils/api";

function Home() {
    const navigate = useNavigate()

    const [user, setUser] = useState({
        name: "",
        username: "",
        password: "",
        userID: "",
    });

    const [citiesVisited, setCitiesVisited] = useState([{
        date: "10/17/23",
        city: "Atlanta",
        country: "United States",
        note: "Visited the Georgia Tech Campus",
        lat: 33.47,
        lng: -84.20,
        history_id: "65557c52041dc1da2bcf79a1"
    },
    {
        date: "9/04/22",
        city: "Madrid",
        country: "Spain",
        note: "Visited my family to celebrate a birthday!",
        lat: 40.42,
        lng: -3.7,
        history_id: "65557d6b041dc1da2bcf79a4"
    }]);

    function setNote(city, note) {
        setCitiesVisited(citiesVisited.map((val) => {
            if (val.city === city) {
                const newCity = {
                    date: val.date,
                    city: val.city,
                    country: val.country,
                    note: note,
                    lat: val.lat,
                    lng: val.lng,
                    history_id: val.history_id
                }
                return newCity;
            } else {
                return val;
            }
        }));
    }
    function setNote2(city, note) {
        setWishlist(wishlist.map((val) => {
            if (val.city === city) {
                const newCity = {
                    date: val.date,
                    city: val.city,
                    country: val.country,
                    note: note,
                    lat: val.lat,
                    lng: val.lng,
                    history_id: val.history_id
                }
                return newCity;
            } else {
                return val;
            }
        }));
    }

    const [wishlist, setWishlist] = useState([]);

    const [count, setCount] = useState({
        city: 0,
        state: 0,
        country: 0,
        continent: 0
    });

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
    const [display, setDisplay] = useState(true);

    function displayVisited() {
        setDisplay(true);
        setPoints(citiesVisited);
    }
    function displayWishlist() {
        setDisplay(false);
        setPoints(wishlist);
    }
    function toggleDisplay() {
        if (display) {
            displayWishlist();
        } else {
            displayVisited();
        }
    }

    useEffect(() => {
        const globe = mainGlobe.current;

        globe.controls().autoRotate = !infoBox;
        globe.controls().autoRotateSpeed = 0.35;
    }, [infoBox])

    function clickLabel(lat, lng) {
        mainGlobe.current.pointOfView({ lat: lat, lng: lng, altitude: .5 }, 1600);
        setInfoBox(true);
        setInfoCoords({ lat: lat, lng: lng });
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
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, "0");
        let day = String(date.getDate()).padStart(2, '0');
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
                for (let i = 0; i < place["address_components"].length; i++) {
                    if (place["address_components"][i]["types"].includes("country")) {
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
                if (user.userID !== undefined && user.userID !== "") {
                    if (outputArr) {
                        AddHistory(user.userID, newCity.city, "", newCity.note, newCity.country, newCity.date, newCity.lat, newCity.lng).then((result) => {
                            if (result.error === undefined) {
                                const updatedCity = {
                                    date: newCity.date,
                                    city: newCity.city,
                                    country: newCity.country,
                                    note: newCity.note,
                                    lat: newCity.lat,
                                    lng: newCity.lng,
                                    history_id: result._id
                                }
                                citiesVisited.push(updatedCity);
                                setPoints([...citiesVisited, newCity]);
                            }
                        });
                    } else {
                        AddWishlist(user.userID, newCity.city, "", newCity.note, newCity.country, newCity.date, newCity.lat, newCity.lng).then((result) => {
                            if (result.error === undefined) {
                                const updatedCity = {
                                    date: newCity.date,
                                    city: newCity.city,
                                    country: newCity.country,
                                    note: newCity.note,
                                    lat: newCity.lat,
                                    lng: newCity.lng,
                                    history_id: result._id
                                }
                                wishlist.push(updatedCity);
                                setPoints([...wishlist, newCity]);
                            }
                        });
                    }
                }

                /**
                if (outputArr) {
                    citiesVisited.push(newCity);
                    displayVisited();
                } else {
                    wishlist.push(newCity);
                    displayWishlist();
                }
                */

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
            <LoginPopup open={loginOpen} close={handleLoginPopup} setUser={setUser} setCitiesVisited={setCitiesVisited} setPoints={setPoints} setWishlist={setWishlist} />

            {user.userID === "" ? (
                <>
                    <Button val={false} onClick={handleLoginPopup} offset={'15vh'}>LOG IN</Button>
                    <Button val={false} onClick={() => { navigate("/create-account") }} offset={'calc(15vh + 50px)'}>SIGN UP</Button>
                </>
            ) : (
                <>
                    <Button val={button1[0]} onClick={handleAddLocation} offset={'15vh'}>ADD LOCATION</Button>
                    <Button val={button1[1]} onClick={handleOpenWishlist} offset={'calc(15vh + 50px)'}>TRAVEL WISHLIST</Button>
                    <Button val={button1[2]} onClick={handleOpenHistory} offset={'calc(15vh + 100px)'}>TRAVEL HISTORY</Button>
                </>
            )}



            <Wishlist openVal={button1[1]} closeVal={handleAddLocation} openVal2={button1[0]} closeVal2={handleClick4} wishlist={wishlist} setNote={setNote2}/>
            <History openVal={button1[2]} closeVal={handleAddLocation} openVal2={button1[0]} closeVal2={handleClick4} citiesVisited={citiesVisited} setNote={setNote} />
            <LocationPopup open={button1[0]} close={handleClick4} onChange={changeLocVal} submit={handleLocSubmit} type={outputArr ? "PIN CITY" : "WISHLIST"}>ADD LOCATION</LocationPopup>
            {infoBox ? citiesVisited.map((val) => (
                <div>
                    {val.lat === infoCoords.lat && val.lng === infoCoords.lng ? <Info city={val.city} country={val.country} date={val.date} note={val.note} lat={val.lat} lng={val.lng}
                        open={infoBox} close={handleClick5} /> : <div />}
                </div>
            )) : <div />}

            {user.userID === "" ? (
                <>

                </>) : (
                <>
                    <Stats cityCount={count.city} stateCount={count.state} countryCount={count.country} continentCount={count.continent} visible={statsOpen} open={openStats} />
                    <Button val={display} onClick={displayVisited} offset={'calc(15vh + 200px)'} disabled={user.userID === ""}>DISPLAY HISTORY</Button>
                    <Button val={!display} onClick={displayWishlist} offset={'calc(15vh + 250px)'} disabled={user.userID === ""}>DISPLAY WISHLIST</Button>
                </>)}
        </div>
    )
}
export default Home;