
import React, { useState } from 'react';
import { IoMdCheckbox } from 'react-icons/io';
function Note({ close, onSave }) {
  const [text, setText] = useState('');
  const [listStyle, setListStyle] = useState('bulleted');
  
  const overallStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', 
  }
  const buttonStyle = {
    borderRadius: '20%',
    width: '100px', 
    height: '30px', 
    background: 'lightgrey', 
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

  const handleSave = () => {
    console.log(text);

  };
  const handleBulletedClick = () => {
    // Get the current cursor position
    
    
    // Insert a new line character and a bullet point character (•) at the cursor position
    const newText =
      text + '\n• ';

    // Update the textarea value
    setText(newText);

    // Set the listStyle to 'text' to indicate regular text
    setListStyle('text');
  };

  
  const handleCheckClick = () => {
 
  
    const newText =
      text + '\n' + <IoMdCheckbox/>;

    // Update the textarea value
    setText(newText);

    // Set the listStyle to 'text' to indicate regular text
    setListStyle('text');
  };

  return (
    
    <div className="note-box">
      <div className="button-bar" >
        <button className="button" onClick={handleBulletedClick}>
          <img src='button1.png' alt='Bullets'/>
        </button>
        <button className="button" onClick={handleCheckClick} >
          <img src='button2.png' alt='CheckMark'/>
        </button>
      </div>
      <textarea 
        value={text}
        
        onChange={(e) => setText(e.target.value)}
        rows="8"
        cols="40" 
        placeholder="Enter your note"/>

       
      <div>
        
      </div>
      <div justifyContent='center' style={overallStyle}><button onClick={handleSave} style = {buttonStyle} >    Save</button></div>
      
    </div>
  );
}

export default Note;
