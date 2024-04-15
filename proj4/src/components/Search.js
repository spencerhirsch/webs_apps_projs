import React, { useState } from 'react';
import './Search.css';
import SearchResults from './SearchResults';

function Search() {
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
                setRecipes(data["documents"]);
            } catch (error) {
                setError(`Failed to fetch recipes: ${error.message}`);
                console.log(error.message)
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className='Search'>
            <img className="Search-image" src="logo.png" alt="Placeholder"></img>
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
            {recipes.length > 0 && <SearchResults results={recipes} />}
        </div >
    );
}

export default Search;
