import { LoginAccount, GetHistory, GetWishlist } from "../utils/api";
import Modal from 'react-modal';
import styled from 'styled-components';
import "@fontsource/overpass-mono";
import "@fontsource/karla"
import { useState } from "react";
import TogglePwdButton from "./TogglePwdButton";

const popupStyle = {
    overlay: {
        margin: 'auto',
        background: 'rgba(219, 220, 255, 0.9)',
        border: '3px solid rgba(255, 255, 255, 0.80)',
        textAlign: 'center',
        width: '450px',
        minHeight: '360px',
        maxHeight: '550px',
        backdropFilter: 'blur(6px)',
    },
    content: {
        background: "rgba(0, 0, 0, 0)",
        color: '#333745',
        border: 'none',
        fontFamily: 'Overpass Mono',
        fontSize: '20px',
        fontWeight: 'bold',
        textAlign: 'left'
    }
}

const ExitButton = styled.button`
    position: absolute;
    right: 0px;
    top: 0px;
    border-radius: 100%;
    border: 1px solid rgba(255, 255, 255, 0.35);
    width: 1.5rem;
    height: 1.5rem;
    background: rgba(255, 255, 255, 0.4);
    transition: all 200ms ease-in-out;
    cursor: pointer;
    &:hover {
        background: rgba(255, 255, 255, 0.75);
    }
    
`
const CustomInput = {
    marginBottom: "30px",
    backgroundColor: "rgba(0, 0, 0, 0)",
    border: "none",
    borderBottom: "1px solid black",
    padding: "10px 0px",
    width: "90%",
    color: "#333745",
    textAlign: "left",
    fontFamily: 'Overpass Mono'
}

const linkStyle = {
    fontFamily: 'Karla',
    fontSize: '15px',
    fontWeight: '300',
    textDecoration: 'underline',
    cursor: 'pointer'
}

const StyledButton = {
    background: 'rgba(255, 255, 255, 0.45)',
    border: '1px solid rgba(255, 255, 255, 0.35)',
    color: 'rgba(0, 0, 0, 1)',
    display: 'inline-block',
    padding: '0.75rem 0',
    transition: 'all 200ms ease-in-out',
    width: '7rem',
    textAlign: 'center',
    fontFamily: "Overpass Mono",
    cursor: 'pointer'
}

const messageStyle = {
    color: 'black',
    textAlign: "left",
    fontFamily: 'Overpass Mono',
    fontSize: '16px'
}

const buttonHolder = {
    display: "flex",
    gap: "20px"
}

function LoginPopup({ children, open, close, setUser, setCitiesVisited, setPoints, setWishlist, clearUser, userData, updateCount }) {

    //Hooks for storing login input fields
    const [user, setUsername] = useState('');
    const [pass, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    function handleUserChange(event) {
        setUsername(event.target.value);
    }
    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    //Message depending on result of login attempt
    const [message, setMessage] = useState('');

    //Checker to make sure fields are nonempty
    function present(val) {
        return val !== "";
    }

    //Handles login
    function handleSubmit() {

        //Checks for username and password present
        if (present(user) && present(pass)) {

            //API call to database to check for user
            LoginAccount(user, pass).then((result) => {
                if (result.error === undefined) {
                    setMessage("");

                    //Updates user hook with user data
                    const newUser = {
                        name: result.name,
                        username: user,
                        password: pass,
                        userID: result._id.$oid
                    }
                    setUser(newUser);

                    //Loads user's city visited through API call
                    GetHistory(newUser.userID).then((result2) => {
                        const updatedCitiesVisited = result2.map((val) => {
                            const newCity = {
                                date: val.date,
                                city: val.city,
                                country: val.country,
                                usstate: val.usstate,
                                note: val.notes,
                                lat: val.lat,
                                lng: val.lng,
                                place_id: val.place_id,
                                history_id: val._id.$oid
                            }
                            return newCity;
                        });
                        setCitiesVisited(updatedCitiesVisited);
                        setPoints(updatedCitiesVisited);
                        updateCount(updatedCitiesVisited);
                    });

                    //Loads user's wishlist through API call
                    GetWishlist(newUser.userID).then((result2) => {
                        const updatedWishlist = result2.map((val) => {
                            const newCity = {
                                date: val.date,
                                city: val.city,
                                country: val.country,
                                usstate: val.usstate,
                                note: val.notes,
                                lat: val.lat,
                                lng: val.lng,
                                history_id: val._id.$oid
                            }
                            return newCity;
                        });
                        setWishlist(updatedWishlist);
                    });
                    setUsername("");
                    setPassword("");
                } else {
                    //Throws error if API call fails
                    setMessage(result.error);
                }
            });
        } else {
            //Error message if user does not fill in all fields
            setMessage("please fill in all fields.")
        }
    }

    return (
        <Modal isOpen={open} backdrop="static" style={popupStyle}>
            <style>
                {` 
                ::placeholder { 
                    color: black; 
                }
                textarea:focus, input:focus{
                    outline: none;
                }
                `
                }
            </style>
            {userData.username === "" ? (
                <section>

                    <h3> LOGIN TO ROAM </h3>

                    <input autoComplete="off" style={CustomInput} type="text" placeholder="USERNAME" id="username" value={user} onChange={handleUserChange} />
                    <input autoComplete="off" style={CustomInput} type={showPassword ? 'text' : 'password'} placeholder="PASSWORD" id="password" value={pass} onChange={handlePasswordChange} />

                    <input style={StyledButton} type="submit" value="SIGN IN" onClick={handleSubmit} />
                    <TogglePwdButton onClick={togglePasswordVisibility} showPassword={showPassword}>
                        {showPassword ? 'Hide' : 'Show'}
                    </TogglePwdButton>
                    

                    {message === undefined ? (
                        <></>
                    ) : (
                        <p style={messageStyle}>{message}</p>
                    )}

                    <p style={{ marginTop: '.5em' }}> <a style={linkStyle} href="/create-account"> Don't have a profile? </a> </p>
                </section>
            ) : (
                <section>

                    <h3> WELCOME TO ROAM, {userData.name.toUpperCase()}</h3>
                    <br />
                    <p>Whether you are tracking the places you've visited or planning a future vacation, Roam has you covered.</p>
                    <br />
                    <div style={buttonHolder}>
                        <input style={StyledButton} type="submit" value="SIGN OUT" onClick={clearUser} />
                        <input style={StyledButton} type="submit" value="CLOSE TAB" onClick={close} />
                    </div>
                </section>
            )}


            <ExitButton onClick={close}> X </ExitButton>
        </Modal>
    )
}

export default LoginPopup