import React, { useState, useContext }  from "react";
import "../css/App.css"

import Earth from '../static/earth.png'
import { CreateAccount, Search } from "../utils/api";
import { RoamContext } from "../utils/roamContext";

const PageStyle = {
    fontFamily: "Overpass Mono",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    gap: "5em",
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

function CreateAccountPage() {

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { newUser, newPassword } = useContext(RoamContext);

    function handleSubmit() {
        console.log('created new user: ' + username + ', password: ' + password)

        CreateAccount(username, password, name).then((result) => {
            console.log(result)
        })
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
            <img src={Earth} className="earth"/>
            <div style={Transparent}>
                <h3 style={{ fontSize: '40px', marginBottom: '0' }} > CREATE A PROFILE </h3>
                <p style={{ fontSize: '16px', marginBottom: '4em' }} > START LOGGING YOUR TRAVELS </p>

                <input style={CustomInput} type="text" placeholder="FIRST NAME" id="name" onChange={handleNameChange}/>
                <input style={CustomInput} type="text" placeholder="USERNAME" id="username" onChange={handleUserChange}/>
                <input style={CustomInput} type="text" placeholder="PASSWORD" id="password" onChange={handlePasswordChange}/>

                <input style={SubmitButton} type="submit" value="CREATE PROFILE" onClick={handleSubmit}/>

            </div>
        </div>
    )
}


export default CreateAccountPage