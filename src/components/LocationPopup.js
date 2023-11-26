import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import "@fontsource/overpass-mono";
import { BsGlobe2 } from 'react-icons/bs'

import { Search } from "../utils/api";
import Suggestion from '../components/Suggestion';

const popupStyle = {
    overlay: {
        margin: 'auto',
        background: 'rgba(219, 220, 255, 0.9)',
        border: '3px solid rgba(255, 255, 255, 0.80)',
        textAlign: 'center',
        width: '30%',
        height: '50%',
        minWidth: '450px',
        minHeight: '550px',
        backdropFilter: 'blur(6px)',
    },
    content: {
        background: 'rgba(0, 0, 0, 0)',
        border: 'none',
        fontFamily: 'Overpass Mono',
        fontSize: '20px',
        fontWeight: 'bold'
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
    &:hover {
        background: rgba(255, 255, 255, 0.75);
    }
`

const locationInput = {
    marginBottom: "30px",
    backgroundColor: "rgba(0, 0, 0, 0)",
    border: "none",
    borderBottom: "1px solid black",
    padding: "10px",
    width: "90%",
    color: "black"
}
const divStyle = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
}
const descriptionStyle = {
    fontSize: "12px",
    fontWeight: "normal",
    marginBottom: "40px"
}
const textStyle = {
    fontFamily: "Overpass Mono",
    fontSize: "14px"
}

const LocationPopup = ({ children, open, close, locInput, onChange, submit}) => {

    //Suggests location options based on input
    const [suggestions, setSuggestions] = useState([]);
    const test = [1, 1, 1];

    function suggestLocation(locInput) {
        console.log(locInput);
        Search(locInput).then((searchData) => {
            const predictions = searchData["predictions"];
            console.log(predictions);
            setSuggestions(predictions);
        });
    }

    //Updates options as you type
    useEffect(()=>{
        suggestLocation(locInput);
    }, [locInput]);

    return (
        <Modal isOpen={open} backdrop="static" style={popupStyle}>
            <div style={divStyle}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <BsGlobe2 />
                    <span>&nbsp;{children}</span>
                </div>
                <p style={descriptionStyle}>LOG YOUR TRAVEL AND ROAM THE WORLD WITH US</p>
                <ExitButton onClick={close}>X</ExitButton>
                <input style={locationInput} value={locInput} onChange={onChange} placeholder="SEARCH FOR CITY" />
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

                {suggestions.length > 0 ? 
                (suggestions.map((val) => (<Suggestion val={val} submit={submit}/>))) : 
                locInput === "" ? (
                    <p style={textStyle}><i>Start typing to see suggested locations...</i></p>
                ) : (
                    <p style={textStyle}><i>No locations found.</i></p>
                )}
            </div>
        </Modal>
    )
}

export default LocationPopup;