import React from 'react';
import Modal from 'react-modal';
import styled, {css} from 'styled-components';

const boxStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%"
  }
const popupStyle = {
    overlay: {
        margin: 'auto',
        background: 'rgba(219, 220, 255, 0.9)',
        border: '3px solid rgba(255, 255, 255, 0.80)',
        textAlign: 'center',
        width: '30%',
        height: '50%',
        minWidth: '450px',
        minHeight: '450px',
        transform: "translateX(-70%)",
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
const titleStyle = {
    fontSize: "1.75rem",
    fontWeight: "bold",
    color: "rgb(0, 0, 0)"
}
const visitedStyle = {
    fontSize: "1rem",
    fontWeight: "normal",
    color: "rgb(100, 100, 100)",
    marginBottom: "10%",
}
const noteStyle = {
    border: "1px solid rgb(255, 255, 255)",
    borderRadius: "8px",
    fontSize: "1.25rem",
    fontWeight: "normal",
    color: "rgb(0, 0, 0)",
    width: "100%",
    height: "100%",
    paddingTop: "20px",
    overflowY: "auto"
}

const Info = ({city, country, date, note, lat, lng, open, close}) => {
    return (
        <Modal isOpen={open}  backdrop="static" style={popupStyle}>
            <div style={boxStyle}>
            <span style={titleStyle}>{city}, {country}</span>
            <span style={visitedStyle}>Visited on {date}</span>
            <div style={noteStyle}>{note}</div>
            </div>
            <ExitButton onClick={close}>X</ExitButton>
        </Modal>
    )
}

export default Info;