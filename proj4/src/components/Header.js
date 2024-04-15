import '../App.css';
import React, { useState } from 'react';
import Popup from './PopupAdd';
import axios from 'axios';

function Header() {
  const [showPopup, setShowPopup] = useState(false);

  // States to track uploading
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const populateDB = async () => {
    try {
      // Fetch json with axios (using fetch gave me conflicting http erros as I was using axios, and js functions)
      setUploading(true);
      await axios.post('http://localhost:3001/api/populate', { signal: "upload" });

      // Update uploadingComplete state
      setUploadComplete(true);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='App-header'>
      {/*Logic to display button when nothing has happened, and messages during uploading, or when uploading is complete*/}
      {!uploadComplete && !uploading && <button onClick={populateDB}>Populate DB</button>}
      {uploading && <p>Uploading recipes...</p>}
      {uploadComplete && <p>Finished uploading recipes</p>}

      <button onClick={togglePopup}>Add Recipe</button>
      {showPopup && <Popup saveCallback={togglePopup} />}
    </div>
  );
}

export default Header;
