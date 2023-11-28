import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './../css/App.css';

//Library for rendering interactive globe
import Globe from 'react-globe.gl';

//API calls to the backend
import { GetInfo, Search, AddHistory, AddWishlist, RemoveHistory, RemoveWishlist } from './../utils/api';

//Custom React components
import Button from '../components/Button';
import LocationPopup from '../components/LocationPopup.js';
import Wishlist from '../components/TravelWishlist.js';
import History from '../components/TravelHistory.js';
import Info from '../components/Info.js';
import Stats from '../components/Stats.js';
import Rankings from '../components/Rankings.js';
import LoginPopup from '../components/LoginPopup.js'
import UserButton from '../components/UserButton'

function Home() {
    const navigate = useNavigate()

    //Default data when not logged in
    const emptyUser = {
        name: "",
        username: "",
        password: "",
        userID: "",
    };

    //Set user-specific data based on local storage, if present, or an empty value if not
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || emptyUser);
    const [citiesVisited, setCitiesVisited] = useState(JSON.parse(localStorage.getItem("citiesVisited")) || []);
    const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem("wishlist")) || []);
    const [cityCount, setCityCount] = useState(localStorage.getItem("cityCount") || 0);
    const [stateCount, setStateCount] = useState(localStorage.getItem("stateCount") || 0);
    const [countryCount, setCountryCount] = useState(localStorage.getItem("countryCount") || 0);

    //Save user-specific data to local storage when hooks are changed
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);
    useEffect(() => {
        localStorage.setItem('citiesVisited', JSON.stringify(citiesVisited));
    }, [citiesVisited]);
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);
    useEffect(() => {
        localStorage.setItem('cityCount', cityCount);
        localStorage.setItem('stateCount', stateCount);
        localStorage.setItem('countryCount', countryCount);
    }, [cityCount, stateCount, countryCount]);

    //Reset hooks to default when logging out
    function clearUser() {
        setUser(emptyUser);
        setCitiesVisited([]);
        setWishlist([]);
        displayVisited();
        setPoints([]);
        clearCount();
    }

    //Update a note for a city visited
    function setNote(history_id, note) {
        setCitiesVisited(citiesVisited.map((val) => {
            if (val.history_id === history_id) {
                const newCity = {
                    date: val.date,
                    city: val.city,
                    country: val.country,
                    usstate: val.usstate,
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

    //Update a note for a wishlist city
    function setNote2(history_id, note) {
        setWishlist(wishlist.map((val) => {
            if (val.history_id === history_id) {
                const newCity = {
                    date: val.date,
                    city: val.city,
                    country: val.country,
                    usstate: val.usstate,
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

    //Delete location for a city visited from hook and database through API call
    function deleteLocation(history_id) {
        RemoveHistory(history_id);
        const updatedCities = citiesVisited.filter((val) => {
            return val.history_id !== history_id;
        })
        setCitiesVisited(updatedCities);
        if (display) {
            setPoints(updatedCities); //Remove location from currently displayed points
        }
    }

    //Delete location for a wishlist city from hook and database through API call
    function deleteLocation2(history_id) {
        RemoveWishlist(history_id);
        const updatedWishlist = wishlist.filter((val) => {
            return val.history_id !== history_id;
        })
        setWishlist(updatedWishlist);
        if (!display) {
            setPoints(updatedWishlist); //Remove location from currently displayed points
        }
    }

    //Update count of places visited by counting number of distinct elements in a set
    function updateCount(arr) {
        let countries = new Set();
        let usstates = new Set();
        // console.log(arr)
        arr.forEach((val) => {
            countries.add(val.country);
            if (val.usstate !== 'US State Not Found') {
                usstates.add(val.usstate);
            } 
        });
        setCityCount(arr.length);
        setStateCount(usstates.size);
        setCountryCount(countries.size);
    }

    //Clear the count
    function clearCount() {
        setCityCount(0);
        setStateCount(0);
        setCountryCount(0);
    }

    //Whether or not to display labels for globe points
    const [displayLabels, setDisplayLabels] = useState(true);
    function toggleLabels() {
        setDisplayLabels(!displayLabels);
    }

    //Whether to display info box and the coords to zoom to
    const [infoBox, setInfoBox] = useState(false);
    const [infoCoords, setInfoCoords] = useState({
        lat: 0,
        lng: 0
    });

    //Globe initialization
    const mainGlobe = useRef();
    useEffect(() => {
        const globe = mainGlobe.current;

        globe.controls().autoRotate = !infoBox;
        globe.controls().autoRotateSpeed = 0.35;
    }, [infoBox])

    //Currently displayed globe points 
    const [points, setPoints] = useState(citiesVisited);

    //Zoom to clicked point
    function clickLabel(lat, lng) {
        mainGlobe.current.pointOfView({ lat: lat, lng: lng, altitude: .5 }, 1600);
        setInfoBox(true);
        setInfoCoords({ lat: lat, lng: lng });
        console.log(infoCoords.lat);
    }

    //Switches between which globe points are displayed
    const [display, setDisplay] = useState(true);
    function displayVisited() {
        setDisplay(true);
        setPoints(citiesVisited);
    }
    function displayWishlist() {
        setDisplay(false);
        setPoints(wishlist);
    }

    //Which menus are currently open
    const [menu, setMenu] = useState([false, false, false]);

    //Hook for managing location input field value
    const [locInput, setLocInput] = useState("");
    const changeLocVal = (event) => {
        setLocInput(event.target.value);
    }

    //Closes info box and zooms out
    const closeInfoBox = () => {
        setInfoBox(false);
        mainGlobe.current.pointOfView({ lat: infoCoords.lat, lng: infoCoords.lng, altitude: 2 }, 1600);
    }

    //Displays stats in bottom right corner if open
    const [statsOpen, setStatsOpen] = useState(true);
    const openStats = () => {
        setStatsOpen(!statsOpen);
    }

    //Displays login screen if open
    const [loginOpen, setLoginOpen] = useState(false);
    const handleLoginPopup = () => {
        setLoginOpen(!loginOpen)
    }

    //Handles opening menus
    const handleAddLocation = () => {
        setMenu([!menu[0], menu[1], menu[2]]);
        closeInfoBox();
    }
    const handleOpenWishlist = () => {
        setMenu([false, !menu[1], false]);
        displayWishlist();
        closeInfoBox();
    }

    const handleOpenHistory = () => {
        setMenu([false, false, !menu[2]]);
        displayVisited();
        closeInfoBox();
    }

    //Handles closing all menus
    const closeMenus = () => {
        setMenu([false, false, false]);
        setLocInput("");
    }

    //Gets current date as a string
    const handleDate = (date) => {
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, "0");
        let day = String(date.getDate()).padStart(2, '0');
        return month + "/" + day + "/" + year;
    }

    //Logic for handling location submit
    const handleLocSubmit = (place_id) => {
        GetInfo(place_id).then((place_json) => {
            
            //Results for identified place
            let place = place_json["results"][0];
            let lat = place["geometry"]["location"]["lat"];
            let lng = place["geometry"]["location"]["lng"];
            let city = place["address_components"][0]["short_name"];

            //Searches for country by looking for "country" address component
            let country = "Country Not Found";
            for (let i = 0; i < place["address_components"].length; i++) {
                if (place["address_components"][i]["types"].includes("country")) {
                    country = place["address_components"][i]["long_name"];
                    break;
                }
            }

            let usstate = "US State Not Found"
            if (country === "United States") {
                for (let i = 0; i < place["address_components"].length; i++) {
                    if (place["address_components"][i]["types"].includes("administrative_area_level_1")) {
                        usstate = place["address_components"][i]["long_name"];
                        break;
                    }
                }
            }

            //JSON data to be sent to database
            const newCity = {
                date: handleDate(new Date()),
                city: city,
                country: country,
                usstate: usstate,
                note: "Note Goes Here",
                lat: lat,
                lng: lng
            };

            //If logged in, send data to databse
            if (user.userID !== undefined && user.userID !== "") {

                //Which database to send to (citiesVisited if true, wishlist if false)
                if (display) {
                    AddHistory(user.userID, newCity.city, place_id, newCity.note, newCity.country, newCity.usstate, newCity.date, newCity.lat, newCity.lng).then((result) => {
                        if (result.error === 'location already added.') {
                            console.log(result.error)
                        } else {
                            //If successfully connected, get MongoDB-generated history_id for new JSON
                            if (result.error === undefined) {
                                const updatedCity = {
                                    date: newCity.date,
                                    city: newCity.city,
                                    country: newCity.country,
                                    usstate: newCity.usstate,
                                    note: newCity.note,
                                    lat: newCity.lat,
                                    lng: newCity.lng,
                                    history_id: result._id.$oid,
                                    place_id: result.place_id
                                }

                                //Update cities with new JSON, toggle view to citiesVisited and update count
                                const updatedCities = [...citiesVisited, updatedCity];
                                setCitiesVisited(updatedCities);
                                displayVisited();
                                setPoints(updatedCities);
                                updateCount(updatedCities);
                            }
                        }    
                    });
                } else {
                    AddWishlist(user.userID, newCity.city, place_id, newCity.note, newCity.country, newCity.usstate, newCity.date, newCity.lat, newCity.lng).then((result) => {

                        //If successfully connected, get MongoDB-generated history_id for new JSON
                        if (result.error === undefined) {
                            const updatedCity = {
                                date: newCity.date,
                                city: newCity.city,
                                country: newCity.country,
                                usstate: newCity.usstate,
                                note: newCity.note,
                                lat: newCity.lat,
                                lng: newCity.lng,
                                history_id: result._id.$oid
                            }

                            //Update cities with new JSON, toggle view to citiesVisited
                            const updatedCities = [...wishlist, updatedCity];
                            setWishlist(updatedCities);
                            displayWishlist();
                            setPoints([...wishlist, newCity]);

                        }
                    });
                }
            }

            //Zoom in to correct globe location
            mainGlobe.current.pointOfView({ lat: lat, lng: lng, altitude: .5 }, 1600);

            //Close all menus
            setMenu([false, false, false]);
        }).catch((error) => {
            console.log("unable to get info for ", place_id);
        })
    }

    //Renders home page
    return (
        <main>
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
                labelText={d => (displayLabels ? d.city : "")}
                labelSize={0.85}
                labelColor={() => 'yellow'}
                labelIncludeDot={true}
                labelDotRadius={0.6}
                onLabelClick={(label, event, { lat, lng, altitude }) => clickLabel(label.lat, label.lng)}
            />
            <UserButton onClick={handleLoginPopup} />
            <LoginPopup open={loginOpen} close={handleLoginPopup} setUser={setUser} setCitiesVisited={setCitiesVisited} setPoints={setPoints} setWishlist={setWishlist} clearUser={clearUser} userData={user} updateCount={updateCount}/>

            {user.userID === "" ? (
                <>
                    <Button val={false} onClick={handleLoginPopup} offset={'15vh'}>LOG IN</Button>
                    <Button val={false} onClick={() => { navigate("/create-account") }} offset={'calc(15vh + 50px)'}>SIGN UP</Button>
                </>
            ) : (
                <>
                    <Button val={menu[0]} onClick={handleAddLocation} offset={'15vh'}>ADD LOCATION</Button>
                    <Button val={menu[2]} onClick={handleOpenHistory} offset={'calc(15vh + 50px)'}>TRAVEL HISTORY</Button>
                    <Button val={menu[1]} onClick={handleOpenWishlist} offset={'calc(15vh + 100px)'}>TRAVEL WISHLIST</Button>
                    <Button val={display} onClick={displayVisited} offset={'calc(15vh + 200px)'}>DISPLAY HISTORY</Button>
                    <Button val={!display} onClick={displayWishlist} offset={'calc(15vh + 250px)'}>DISPLAY WISHLIST</Button>
                    <Button val={!displayLabels} onClick={toggleLabels} offset={'calc(15vh + 300px)'}>TOGGLE LABELS</Button>
                    <Stats cityCount={cityCount} stateCount={stateCount} countryCount={countryCount} visible={statsOpen} open={openStats} />
                    <Rankings/>
                </>
            )}

            <History openVal={menu[2]} closeVal={handleAddLocation} openVal2={menu[0]} closeVal2={closeMenus} citiesVisited={citiesVisited} setNote={setNote} deleteLocation={deleteLocation} />
            <Wishlist openVal={menu[1]} closeVal={handleAddLocation} openVal2={menu[0]} closeVal2={closeMenus} wishlist={wishlist} setNote={setNote2} deleteLocation={deleteLocation2} />

            <LocationPopup open={menu[0]} close={closeMenus} locInput={locInput} onChange={changeLocVal} submit={handleLocSubmit}>ADD {display ? "VISITED" : "WISHLIST"}</LocationPopup>
            {infoBox ? citiesVisited.map((val) => (
                <div>
                    {val.lat === infoCoords.lat && val.lng === infoCoords.lng ? <Info city={val.city} country={val.country} date={val.date} note={val.note} lat={val.lat} lng={val.lng}
                        open={infoBox} close={closeInfoBox} /> : <div />}
                </div>
            )) : <div />}
        </main>
    )
}
export default Home;