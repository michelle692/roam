import { PiUserCircleThin } from "react-icons/pi";
import styled from 'styled-components';

const StyledButton = styled.button`
    position: absolute;
    top: 30px;
    right: 40px;
    padding: 0;
    padding-top: .25em;
    margin: 0.5rem;
    border-radius: 100%;
    border: 1px solid rgba(255, 255, 255, 0.35);
    width: 2rem;
    height: 2rem;
    background: rgba(255, 255, 255, 0.4);
    color: rgb(255, 255, 255);
    cursor: pointer;

    &:hover {
        background: rgba(255, 255, 255, 0.75);
    }
`

const UserButton = ({ onClick }) => {
    return (
        <StyledButton onClick={onClick}> <PiUserCircleThin fontSize={25} style={{ margin: 0 }}/> </StyledButton>
    )
}

export default UserButton

