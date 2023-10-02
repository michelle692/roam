import React from 'react';
import Modal from 'react-modal';

const popupStyle = {
    overlay: {
        margin: 'auto',
        background: 'rgba(217, 217, 217, 0.90)',
        paddingLeft: '200px',
        paddingRight: '200px',
        paddingTop: '100px',
        paddingBottom: '100px',
        borderRadius: '10px',
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    content: {
        background: 'rgba(0, 0, 0, 0)',
        border: 'none',
        fontFamily: 'Overpass Mono'
    }
}

const Popup = ({children, open}) => {
    return (
        <Modal isOpen={open}  backdrop="static" style={popupStyle}>
            {children}
        </Modal>
    )
}

export default Popup;