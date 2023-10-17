import React from 'react';
import Modal from 'react-modal';

const popupStyle = {
    overlay: {
        margin: 'auto',
        background: 'rgba(255, 255, 255, 0.5)',
        border: '3px solid rgba(249, 249, 249, 0.78)',
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '40%',
        height: '50%',
        transform: 'translate(-60%, -50%)',
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
const exitButton = {
    position: 'absolute',
    right: '0%',
    top: '0%',
    borderRadius: '100%',
    border: 'none',
    width: '1.5rem',
    height: '1.5rem',
    background: 'rgba(255, 255, 255, 0.5)'
}
const submitButton = {
    position: 'absolute',
    right: '44%',
    top: '40%',
    borderRadius: '70%',
    border: 'none',
    height: '1.5rem',
    background: 'rgba(255, 255, 255, 0.5)'
}
const locationInput = {
    position: 'absolute',
    left: '34%',
    top: '20%',
}

const LocationPopup = ({children, open, close, onChange, submit}) => {
    return (
        <Modal isOpen={open}  backdrop="static" style={popupStyle}>
            {children}
            <button style={exitButton} onClick={close}>X</button>
            <input style={locationInput} onChange={onChange}/>
            <button style={submitButton} onClick={submit}>SUBMIT</button>
        </Modal>
    )
}

export default LocationPopup;