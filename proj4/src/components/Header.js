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
      const response = await axios.get('/recipes.json');
      const jsonData = response.data;

      const entriesToPopulate = jsonData.slice(0, 782);

      // Making batches to avoid a too large payload
      const batchSize = 100;
      const batches = [];

      for (let i = 0; i < entriesToPopulate.length; i += batchSize) {
        batches.push(entriesToPopulate.slice(i, i + batchSize));
      }

      // Update uploading state
      setUploading(true);

      // Send batch to backend
      for (const batch of batches) {
        await axios.post('http://localhost:3001/api/populate', { entries: batch });
      }

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
      {showPopup && <Popup />}
    </div>
  );
}

export default Header;
