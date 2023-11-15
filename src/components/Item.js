import React, { useState } from "react";
import styled, {css} from 'styled-components';
import {BsFillPencilFill} from "react-icons/bs";
import Note from "./note";
import Popup from "./Popup";




const handleSaveNote = (noteData) => {

    console.log('Note data:', noteData);
};
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
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const handleClickButton = () => {
        setIsPopupOpen(!isPopupOpen);
      };
    return (
        
        <div style={itemStyle}>
            <p style={titleStyle}>{date} | {city}, {country}  |  {lat}, {long}</p>
            <p style={noteStyle}>{note}</p>
            <StyledButton style={{display:"flex", alignItems:"center"}} onClick={handleClickButton}><BsFillPencilFill/></StyledButton>

      {isPopupOpen && (
        <Popup size="500px" open={isPopupOpen} close={handleClickButton} >
          NOTE
          <Note onSave={handleSaveNote} />
        </Popup>
      )}
                 </div>
        
    )
}
export default Item;
