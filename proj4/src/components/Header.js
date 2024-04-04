import '../App.css'
import React, { useState } from 'react';
import Popup from './PopupAdd'

function Header() {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
      setShowPopup(!showPopup);
    };
    return (
      <div className='App-header'>
        <button >Populate DB</button>
        <button onClick={togglePopup}>Add Recipe</button>
        {showPopup && <Popup />}
      </div>
    );
  }
  
  export default Header;
  