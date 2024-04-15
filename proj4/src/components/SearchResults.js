import React, { useState } from 'react';
import './SearchResults.css';
import RecipeCard from './RecipeCard';

function SearchResults({ results }) {
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    return <div className='SearchResults'>
        {
            selectedRecipe == null ?
                /*
                    If a recipe isn't selected, show them all in small card view.
                    The 'View Recipes' button should switch to big card view.
                */
                results.map((elem) =>
                    <RecipeCard item={elem} isLarge={false} btnCallback={() => setSelectedRecipe(elem)}></RecipeCard>)
                :
                /*
                    If a recipe is selected, show it in big card view.
                    The 'View Recipes' button should switch back to small card view.
                */
                <RecipeCard item={selectedRecipe} isLarge={true} btnCallback={() => setSelectedRecipe(null)}></RecipeCard>
        }
    </div>
}

export default SearchResults;
