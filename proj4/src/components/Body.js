import React, { useState } from 'react';
import '../App.css';

function Body() {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearchChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch(`http://localhost:3001/api/search?query=${encodeURIComponent(query)}`)
;
            if (!response.ok) {
                const textResponse = await response.text();
                console.log(textResponse); // Log the full text response to console
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            setError(`Failed to fetch recipes: ${error.message}`);
            console.log(error.message)
        } finally {
            setIsLoading(false);
        }
    }
};

    return (
      <div className='App-body'>
          <img className="Search-image" src="https://cdn.discordapp.com/attachments/949044899381141544/1224922612946178119/image.png?ex=661f4114&is=660ccc14&hm=3f22617c29b6461972cda47e42cbee9b782f421e2e15bc6a9334409a06e6495e&" alt="Placeholder"></img>
          <input
                className="Search-bar"
                type="text"
                value={query}
                onChange={handleSearchChange}
                onKeyDown={handleSearchSubmit} // Listen for the key press event
                placeholder="Find Recipe"
            />
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            <div>
                <pre>{JSON.stringify(recipes, null, 2)}</pre>
            </div>
      </div>
    );
  }
  
  export default Body;
  