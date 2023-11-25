import React, { useState } from "react";
import "../css/App.css"

import Earth from '../static/earth.png'
import { CreateAccount, Search } from "../utils/api";
import { useNavigate } from "react-router";

const PageStyle = {
    fontFamily: "Overpass Mono",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    gap: "5em",
    overflow: "hidden"
}

const Transparent = {
    backdropFilter: "blur(5px)",
    backgroundColor: "rgba(139, 116, 176, 0.45)",
    height: "75%",
    padding: "1em 2em",
    width: "95%",
    display: "flex",
    flexDirection: "column",
    paddingTop: '8vh',
    paddingLeft: '40vw'
}

const CustomInput = {
    marginBottom: "30px",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "1px solid white",
    padding: "10px 0px",
    width: "28%",
    color: 'white',
    textAlign: "left",
    fontFamily: 'Overpass Mono',
    fontSize: '20px'
}

const SubmitButton = {
    background: 'rgba(255, 255, 255, 0.45)',
    border: '1px solid white',
    color: 'white',
    display: 'inline-block',
    padding: '0.75rem 0',
    transition: 'all 200ms ease-in-out',
    width: '12rem',
    textAlign: 'center',
    fontFamily: "Overpass Mono",
    cursor: 'pointer',
    fontSize: '16px'
}

const messageStyle = {
    whiteSpace: "pre-wrap"
}

function CreateAccountPage() {
    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('');

    const validUsername = (user) => {
        return user.length >= 4;
    }

    const validPassword = (pass) => {
        return pass.length >= 6;
    }

    const validName = (name) => {
        return name !== "";
    }

    function handleSubmit() {
        let mess = "";
        if (!validName(name)) {
            mess = "please enter valid name.";
        }
        if (!validUsername(username)) {
            mess += (mess === "" ? "" : "\n") + "please enter valid username (at least 4 characters).";
        }
        if (!validPassword(password)) {
            mess += (mess === "" ? "" : "\n") + "please enter valid password (at least 6 characters).";
        }
        if (validName(name) && validUsername(username) && validPassword(password)) {
            CreateAccount(username, password, name).then((result) => {
                console.log(result);
                if (result.error === undefined) {
                    console.log('created new user: ' + username + ', password: ' + password);
                    setName('');
                    setUsername('');
                    setPassword('');
                    setMessage('account successfully created.');
                } else {
                    setMessage(result.error);
                }
            });
        } else {
            setMessage(mess);
        }

    }

    function handleNameChange(event) {
        setName(event.target.value)
    }

    function handleUserChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    function handleReturn() {
        navigate("/");
    }

    return (
        <div style={PageStyle}>
            <style>
                {` 
                ::placeholder { 
                    color: white; 
                }
                textarea:focus, input:focus {
                    outline: none;
                }
                `
                }
            </style>
            <img src={Earth} className="earth" />
            <div style={Transparent}>
                <h3 style={{ fontSize: '40px', marginBottom: '0' }} > CREATE A PROFILE </h3>
                <p style={{ fontSize: '16px', marginBottom: '4em' }} > START LOGGING YOUR TRAVELS </p>

                <input autocomplete="off" style={CustomInput} type="text" placeholder="FIRST NAME" id="name" value={name} onChange={handleNameChange} />
                <input autocomplete="off" style={CustomInput} type="text" placeholder="USERNAME" id="username" value={username} onChange={handleUserChange} />
                <input autocomplete="off" style={CustomInput} type="text" placeholder="PASSWORD" id="password" value={password} onChange={handlePasswordChange} />

                <input style={SubmitButton} type="submit" value="CREATE PROFILE" onClick={handleSubmit} />

                {message === undefined ? (
                    <></>
                ) : (
                    <p style={messageStyle}>{message}</p>
                )}
                <input style={SubmitButton} type="submit" value="RETURN HOME" onClick={handleReturn} />
            </div>
        </div>
    )
}


export default CreateAccountPage;