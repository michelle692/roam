import React from 'react';
import color from 'color';

const buttonStyle = {
    margin: '10px',
    fontSize: 19,
    width: '250px',
    height: '50px',
    padding: '10px',
    paddingLeft: '30px',
    background: color('rgba(217, 217, 217, 0.25)'),
    color: color('rgba(255, 255, 255, 0.85)'),
    stroke: color('rgba(255, 255, 255, 0.35)'),
    position: 'absolute',
    top: 50,
    left: 50,
    border: 'none',
    textAlign: 'left'
}

const Button = ({children, onClick}) => {
    return (
        <button style={buttonStyle} onClick={onClick}> {children} </button>
    )
}

export default Button;