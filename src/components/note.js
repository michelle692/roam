import React, { useState } from 'react';

import { EditHistory } from "../utils/api";

function Note({history_id, setNote }) {
  const [text, setText] = useState('');
  
  const overallStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', 
  }
  const buttonStyle = {
    background: 'rgba(217, 217, 217, 0.25)',
    border: '1px solid rgba(0, 0, 0, 1)',
    width: '12rem', 
    padding: '0.75rem 0',
    color: 'black', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Overpass Mono',
    fontSize: '15px',
    fontWeight: 'normal',
    margin: '10px',
    marginBottom: '15px'
  };

  const textAreaStyle = {
    marginTop: "20px"
  }

  const handleSave = () => {
    EditHistory(history_id, text);
    setNote(history_id, text);
  };

  return (
    
    <div className="note-box">
      <textarea 
        value={text}
        
        onChange={(e) => setText(e.target.value)}
        rows="8"
        cols="40" 
        placeholder="Enter your note"
        style={textAreaStyle}
        />
        
      <div>
        
      </div>
      <div justifyContent='center' style={overallStyle}><button onClick={handleSave} style = {buttonStyle} >    Save</button></div>
      
    </div>
  );
}

export default Note;
