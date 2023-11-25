import React from 'react';
import styled, { css } from 'styled-components';
import "@fontsource/overpass-mono";

const StyledButton = styled.button`
    position: ${props => props.start ? "relative" : "absolute"};
    top: ${props => !props.start && (props.offset || '50px')};
    right: ${props => !props.start ? "40px": ""};
    background: rgba(217, 217, 217, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.35);
    color: rgba(255, 255, 255, 0.8);
    display: inline-block;
    margin: ${props => !props.start ? "0.5rem 1rem" : ""};
    padding: 0.75rem 0;
    transition: all 200ms ease-in-out;
    width: 12rem;
    text-align: left;
    padding-left: 1rem;
    font-family: "Overpass Mono";

    ${props => !props.val && css `
        &:hover {
            background: rgba(255, 255, 255, 0.35);
        }
    `}

    ${props => props.val && css`
        background: rgba(255, 255, 255, 1);
        color: black;
        mix-blend-mode: screen;
    `}
`

const Button = ({ children, onClick, val, offset, start}) => {
    return (
        <StyledButton val={val} onClick={onClick} offset={offset} start={start}> {children} </StyledButton>
    )
}

export default Button;
