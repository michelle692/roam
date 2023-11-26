import React from "react";
import "@fontsource/overpass-mono";
import styled from 'styled-components';
import { AiFillStar } from "react-icons/ai";

const StatsStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    textAlign: "right",
    fontFamily: 'Overpass Mono',
    fontSize: '16px',
    fontWeight: 'normal',
    position: "absolute",
    right: "50px",
    bottom: "50px",
    color: "rgba(255, 255, 255, 0.7)",
    margin: "0.5rem"
}
const ExitButton = styled.button`
    margin-left: auto;
    border-radius: 100%;
    border: 1px solid rgba(255, 255, 255, 0.35);
    width: 1.5rem;
    height: 1.5rem;
    background: rgba(255, 255, 255, 0.4);
    color: rgb(255, 255, 255);
    margin-bottom: 10px;
    transition: all 200ms ease-in-out;
    &:hover {
        background: rgba(255, 255, 255, 0.75);
    }
`
const ExitButton2 = styled.button`
    position: absolute;
    right: 50px;
    bottom: 50px;
    border-radius: 100%;
    border: 1px solid rgba(255, 255, 255, 0.35);
    width: 1.5rem;
    height: 1.5rem;
    background: rgba(255, 255, 255, 0.4);
    color: rgb(255, 255, 255);
    transition: all 200ms ease-in-out;
    &:hover {
        background: rgba(255, 255, 255, 0.75);
    }
`

const Stats = ({cityCount, stateCount, countryCount, visible, open}) => {
    return (
        <div>
        {visible ? 
        <div style={StatsStyle}>
            <ExitButton onClick={open} style={{display:"flex", alignItems:"center"}}><AiFillStar/></ExitButton>
            <span>CITIES VISITED: {cityCount}</span>
            <span>STATES VISITED: {stateCount}</span>
            <span>COUNTRIES VISITED: {countryCount}</span>
        </div>
        : <ExitButton2 onClick={open} style={{display:"flex", alignItems:"center"}}><AiFillStar/></ExitButton2>}
        </div>
    )
}
export default Stats;