import React from 'react';
import Modal from 'react-modal';
import styled, {css} from 'styled-components';

const popupStyle = {
    overlay: {
        margin: 'auto',
        background: 'rgba(80, 80, 150, 0.7)',
        border: 'none',
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100%',
        height: '80%',
        transform: 'translate(-50%, -30%)',
        backdropFilter: 'blur(8px)',
    },
    content: {
        background: 'rgba(0, 0, 0, 0)',
        border: 'none',
        fontFamily: 'Overpass Mono',
        fontSize: '40px',
        fontWeight: 'bold',
        color: 'white'
    }
}
const ExitButton = styled.button`
    position: absolute;
    left: 0px;
    top: 10px;
    border-radius: 5px;
    border: none;
    width: 5rem;
    height: 4rem;
    background: rgba(255, 255, 255, 0);
    color: white;
    font-size: 50px;
    transition: all 200ms ease-in-out;
    &:hover {
        background: rgba(255, 255, 255, 0.1);
    }
`

const LargePopup = ({children, open, close}) => {
    return (
        <Modal isOpen={open}  backdrop="static" style={popupStyle}>
            {children}
            <ExitButton onClick={close}>&lt;</ExitButton>
        </Modal>
    )
}

export default LargePopup;
