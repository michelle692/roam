import { LoginAccount } from "../utils/api";
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

function LoginPopup({children, open, close}) {
    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit() {
        LoginAccount(username, password)
        console.log('signed in user: ' + username + ', password: ' + password)
    }

    function handleUserChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    return (
        <Modal isOpen={open}  backdrop="static" style={popupStyle}>
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

                <input style={CustomInput} type="text" placeholder="USERNAME" id="username" onChange={handleUserChange}/>
                <input style={CustomInput} type="text" placeholder="PASSWORD" id="password" onChange={handlePasswordChange}/>

                <input style={StyledButton} type="submit" value="SIGN IN" onClick={handleSubmit}/>

                <p style={{ marginTop: '.5em' }}> <a style={linkStyle} onClick={() => navigate('/create-account')}> Don't have a profile? </a> </p>
            </div>

            <ExitButton onClick={close}> X </ExitButton>
        </Modal>
    )
}

export default LoginPopup