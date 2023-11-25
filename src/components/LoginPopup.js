import { LoginAccount, GetHistory, GetWishlist } from "../utils/api";
import Modal from 'react-modal';
import styled, { css } from 'styled-components';
import "@fontsource/overpass-mono";
import "@fontsource/karla"
import { useState } from "react";
import { useNavigate } from "react-router";

const popupStyle = {
    overlay: {
        margin: 'auto',
        background: 'rgba(219, 220, 255, 0.9)',
        border: '3px solid rgba(255, 255, 255, 0.80)',
        textAlign: 'center',
        width: '30%',
        height: '50%',
        minWidth: '450px',
        minHeight: '360px',
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

function LoginPopup({ children, open, close, setUser, setCitiesVisited, setPoints, setWishlist }) {
    const navigate = useNavigate();

    const [user, setUsername] = useState('');
    const [pass, setPassword] = useState('');
    const [message, setMessage] = useState('');

    function present(val) {
        return val !== "";
    }

    function handleSubmit() {
        if (present(user) && present(pass)) {
            LoginAccount(user, pass).then((result) => {
                console.log(result);
                if (result.error === undefined) {
                    setMessage("logged in.");
                    const newUser = {
                        name: result.name,
                        username: user,
                        password: pass,
                        userID: result._id.$oid
                    }
                    setUser(newUser);
                    GetHistory(newUser.userID).then((result2) => {
                        const updatedCitiesVisited = result2.map((val) => {
                            const newCity = {
                                date: val.date,
                                city: val.city,
                                country: val.country,
                                note: val.notes,
                                lat: val.lat,
                                lng: val.lng,
                                history_id: val._id.$oid
                            }
                            return newCity;
                        });
                        setCitiesVisited(updatedCitiesVisited);
                        setPoints(updatedCitiesVisited);
                    });
                    GetWishlist(newUser.userID).then((result2) => {
                        const updatedWishlist = result2.map((val) => {
                            const newCity = {
                                date: val.date,
                                city: val.city,
                                country: val.country,
                                note: val.notes,
                                lat: val.lat,
                                lng: val.lng,
                                history_id: val._id.$oid
                            }
                            return newCity;
                        });
                        setWishlist(updatedWishlist);
                    });
                    close();
                } else {
                    setMessage(result.error);
                }
            });
        } else {
            setMessage("please fill in all fields.")
        }
    }

    function handleUserChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
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
            <div>
                <h3> LOGIN TO ACCESS MORE FEATURES </h3>

                <input autocomplete="off" style={CustomInput} type="text" placeholder="USERNAME" id="username" value={user} onChange={handleUserChange} />
                <input autocomplete="off" style={CustomInput} type="text" placeholder="PASSWORD" id="password" value={pass} onChange={handlePasswordChange} />

                <input style={StyledButton} type="submit" value="SIGN IN" onClick={handleSubmit} />
                {message === undefined ? (
                    <></>
                ) : (
                    <p style={messageStyle}>{message}</p>
                )}

                <p style={{ marginTop: '.5em' }}> <a style={linkStyle} onClick={() => navigate('/create-account')}> Don't have a profile? </a> </p>
            </div>

            <ExitButton onClick={close}> X </ExitButton>
        </Modal>
    )
}

export default LoginPopup