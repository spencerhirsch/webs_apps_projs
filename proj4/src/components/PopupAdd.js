import React, { useState } from 'react';
import axios from 'axios';
import './Card.css'

function Popup({ saveCallback }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [items, setItems] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [ingredient, setIngredient] = useState('');


    const handleAddItem = (e) => {
        e.preventDefault();
        const newItem = { quantity: quantity, ingredient: ingredient };
        setItems(prevItems => [...prevItems, newItem]);
        setQuantity('');
        setIngredient('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'quantity') {
            setQuantity(value);
        } else if (name === 'ingredient') {
            setIngredient(value);
        } else if (name === 'name') {
            setName(value);
        } else if (name === 'description') {
            setDescription(value);
        }
    };

    // Write recipe to the db
    const saveRecipe = async () => {

        const mergedArray = items.map(obj => obj.quantity ? `${obj.quantity} ${obj.ingredient}` : obj.ingredient);

        const newEntry = {
            name: name,
            description: description,
            image: "",
            recipeYield: "",
            cookTime: "",
            prepTime: "",
            ingredients: mergedArray
        };

        try {
            // Use the current URL as a reference so the query works both locally and on EC2
            const url = window.location.href.replace(":3000/", ":3001/");
            await axios.post(`${url}api/populate`, { entry: newEntry });
            saveCallback();
        } catch (error) {
            console.error('Error', error);
        }
    };

    return (
        <div className='Card'>
            <div className='Card-header'>
                <h1>Add Recipe</h1>
            </div>
            <div className='Card-body'>
                <div className='Card-item'>
                    <h3 className='left'>Name</h3>
                    <input className='right' type="text" name="name" value={name} onChange={handleChange}></input>
                </div>
                <div className='Card-item'>
                    <h3 className='left'>Description</h3>
                    <input className='right' type="text" name="description" value={description} onChange={handleChange}></input>
                </div>
                <div className='Ingredients'>
                    <div className='Ingredients-header'>
                        <h4 className='left'>Quantity</h4>
                        <h4 className='right'>Ingredient</h4>
                    </div>
                    <div className='Ingredients-body'>
                        {items.map((item, index) => (
                            <div key={index}>
                                <div className='Single-ingredient'>
                                    <p className='left'>{item.quantity}</p>
                                    <p className='right'>{item.ingredient}</p>
                                </div>
                            </div>
                        ))}
                        <h3>Add Ingredient</h3>
                        <div className='Card-item'>
                            <h3 className='left'>Quantity</h3>
                            <input type="text" name="quantity" value={quantity} onChange={handleChange}></input>
                        </div>
                        <div className='Card-item'>
                            <h3 className='right'>Ingredient</h3>
                            <input type="text" name="ingredient" value={ingredient} onChange={handleChange}></input>
                        </div>
                    </div>
                    <button onClick={handleAddItem} className='Add-ingredient'>Add Ingredient</button>
                    <hr className='Divider'></hr>
                    <button onClick={saveRecipe} className='Save-ingredient'>Save Recipe</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
