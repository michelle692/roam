import React from "react";
import styled, {css} from 'styled-components';
import {BsFillPencilFill} from "react-icons/bs";

const itemStyle = {
    paddingLeft: '30px',
    paddingRight: '30px',
    paddingTop: '5px',
    paddingBottom: '5px',
    background: 'rgba(255, 255, 255, 0.0)',
    border: '3px solid rgba(249, 249, 249, 0.78)',
    backdropFilter: 'blur(6px)',
    width: '70%',
    margin: '25px',
}

const titleStyle = {
    fontFamily: 'Overpass Mono',
    fontSize: '25px',
    fontWeight: 'bold',
    margin: '0px',
    marginTop: '15px',
}

const noteStyle = {
    fontFamily: 'Overpass Mono',
    fontSize: '15px',
    fontWeight: 'normal',
    margin: '10px',
    marginBottom: '15px'
}
const StyledButton = styled.button`
    position: absolute;
    right: 10px;
    top: 10px;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 1);
    font-size: 20px;
    font-weight: bold;
    &:hover {
        filter: brightness(0.75);
    }
`

const Item = ({date, city, country, note, lat, long}) => {
    return (
        <div style={itemStyle}>
            <p style={titleStyle}>{date} | {city}, {country}  |  {lat}, {long}</p>
            <p style={noteStyle}>{note}</p>
            <StyledButton style={{display:"flex", alignItems:"center"}}><BsFillPencilFill/></StyledButton>
        </div>
    )
}
export default Item;
