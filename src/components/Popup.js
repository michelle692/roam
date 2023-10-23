import React from 'react';
import Modal from 'react-modal';
import styled, {css} from 'styled-components';

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
const ExitButton = styled.button`
    position: absolute;
    right: 0px;
    top: 0px;
    border-radius: 100%;
    border: none;
    width: 1.5rem;
    height: 1.5rem;
    background: rgba(255, 255, 255, 0.5);
    transition: all 200ms ease-in-out;
    &:hover {
        background: rgba(255, 255, 255, 0.7);
    }
`

const Popup = ({children, open, close}) => {
    return (
        <Modal isOpen={open}  backdrop="static" style={popupStyle}>
            {children}
            <ExitButton onClick={close}>X</ExitButton>
        </Modal>
    )
}

export default Popup;
