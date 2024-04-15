import React, { useState } from 'react';
import './RecipeCard.css';

function RecipeCard({ item, isLarge, btnCallback }) {
    return (
        /*
         *
         * LARGE VIEW RECIPE CARD
         * 
         */
        isLarge ? (<div className='RC-main-large'>
            { /* Card image (touches edges) */}
            <img className='RC-img' src={item.image} onError={useDummyImg}></img>

            { /* Card body (padded away from edges) */}
            <div className='RC-body'>
                <h3>{item.name}</h3>

                <div className='RC-desc'>
                    <p><strong>CookTime:</strong>{timeToHHMM(item.cookTime)}</p>
                    <p><strong>PrepTime:</strong>{timeToHHMM(item.prepTime)}</p>
                    <p><strong>Yield:</strong>{item.recipeYield}</p>
                </div>

                { /* Exclusive to big recipe view */}
                <p>{item.description}</p>

                <h3 className='RC-ingredients-header'>Ingredients</h3>
                <ul className='RC-ingredients'>
                    {
                        item.ingredients.map((elem) => (
                            <li>{elem}</li>
                        ))
                    }
                </ul>

                { /* 'View Recipe' button*/}
                <button onClick={btnCallback}>View Recipe</button>
            </div>
        </div>)

            :

            /*
             *
             * SMALL VIEW RECIPE CARD
             * 
             */
            (<div className='RC-main-small'>
                { /* Card image (touches edges) */}
                <img className='RC-img' src={item.image} onError={useDummyImg}></img>

                { /* Card body (padded away from edges) */}
                <div className='RC-body'>
                    <h3>{item.name}</h3>

                    <div className='RC-desc'>
                        <p><strong>CookTime:</strong>{timeToHHMM(item.cookTime)}</p>
                        <p><strong>PrepTime:</strong>{timeToHHMM(item.prepTime)}</p>
                        <p><strong>Yield:</strong>{item.recipeYield}</p>
                    </div>

                    { /* 'View Recipe' button*/}
                    <button onClick={btnCallback}>View Recipe</button>
                </div>
            </div>)
    );
}

// Use a silhouette image if the recipe image fails to load
function useDummyImg(img) {
    img.currentTarget.src = 'dummy_recipe.png'
}

// Convert the time strings to HH:MM format
function timeToHHMM(time) {
    // Some recipes have no time provided
    if (time === '') {
        return '00:00';
    }

    // Malformed recipe time
    if (!time.startsWith('P')) {
        return '00:00';
    }

    let hour = 0;
    let minute = 0;

    let tok = '';
    for (let i = 1; i < time.length; i++) {
        const c = time[i];

        // Numeric (part of the token)
        if (c >= '0' && c <= '9') {
            tok += c;
        }
        // 'D'/'H'/'M' (end of the token)
        else {
            switch (c) {
                case 'D':
                    break;
                case 'H':
                    hour = parseInt(tok);
                    break;
                case 'M':
                    minute = parseInt(tok);
                    break;
                default:
                    break;
            }

            tok = '';
        }
    }

    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

export default RecipeCard;
