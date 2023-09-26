import React from 'react';
import color from 'color';
import Popup from 'reactjs-popup';

const popupStyle = {
    margin: 'auto',
    background: color('#FFFFFF'),
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
}

const Pop = ({children, trigger}) => {
    return (
        <Popup trigger={trigger} modal nested>
        <div style={popupStyle}>{children}</div>
        </Popup>
    )
}

export default Pop;