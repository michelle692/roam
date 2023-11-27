import React, { useState } from 'react';
import styled from 'styled-components';
import { EditHistory } from "../utils/api";

const overallStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  marginTop: "20px",
  width: "100%"
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

const textAreaStyle = {
  width: "100%"
}

function Note({ history_id, setNote }) {

  //Managing input field and saving any edits
  const [text, setText] = useState('');

  const handleSave = () => {
    EditHistory(history_id, text);
    setNote(history_id, text);
  };

  return (
    <div style={overallStyle}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="8"
        placeholder="Enter your new note..."
        style={textAreaStyle}
      />
      <StyledButton onClick={handleSave}>Save</StyledButton>
    </div>
  );
}

export default Note;
