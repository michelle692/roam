import { PiEye, PiEyeSlash } from "react-icons/pi";
import styled from 'styled-components';

const StyledButton = styled.button`
    position: absolute;
    top: 155px;
    right: 40px;
    padding: 0;
    padding-top: .25em;
    margin: 0.5rem;
    border-radius: 100%;
    border: 1px solid rgba(255, 255, 255, 0.35);
    width: 2rem;
    height: 2rem;
    background: rgba(255, 255, 255, 0.2);
    color: rgb(0, 0, 0);
    cursor: pointer;

    &:hover {
        background: rgba(255, 255, 255, 0.75);
    }
`

const TogglePwdButton = ({ onClick, showPassword }) => {
    return (
      <StyledButton onClick={onClick}>
          {showPassword ? <PiEye fontSize={20} style={{ margin: 0 }} /> : <PiEyeSlash fontSize={20} style={{ margin: 0 }} />}
      </StyledButton>
    )
}

export default TogglePwdButton