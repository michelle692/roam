import "@fontsource/overpass-mono";
import styled from 'styled-components';

const SuggestionBox = {
    width: "100%",
    padding: "15px",
    background: 'rgba(219, 220, 255, 0.9)',
    border: '3px solid rgba(255, 255, 255, 0.80)',
    margin: "0px",
    fontFamily: 'Overpass Mono',
    fontSize: '16px',
    fontWeight: 'bold'
}

const StyledButton = styled.button`
    background: rgba(255, 255, 255, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.35);
    color: rgba(0, 0, 0, 1);
    display: inline-block;
    margin-bottom: 10px;
    padding: 0.75rem 0;
    transition: all 200ms ease-in-out;
    width: 100%;
    text-align: center;
    font-family: "Overpass Mono";

    &:hover {
        background: rgba(255, 255, 255, 0.75);
    }
`

const Suggestion = ({ val, submit }) => {
    return (
        <StyledButton onClick={()=>{submit(val.place_id)}}>
            {val.description}
        </StyledButton>
    )
}

export default Suggestion;
