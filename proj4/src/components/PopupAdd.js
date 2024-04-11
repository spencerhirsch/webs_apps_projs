import React, { useState } from 'react';
import './Card.css'

function Popup() {
    const [items, setItems] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [ingredient, setIngredient] = useState('');

    const handleAddItem = (e) => {
        e.preventDefault();
        const newItem = { quantity: quantity, ingredient: ingredient };
        setItems(prevItems => [...prevItems, newItem]);
        setQuantity('');
        setIngredient('');
        console.log(items)
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'quantity') {
            setQuantity(value);
        } else if (name === 'ingredient') {
            setIngredient(value);
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
                    <input className='right'></input>
                </div>
                <div className='Card-item'>
                    <h3 className='left'>Description</h3>
                    <input className='right'></input>
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
                        <button className='Save-ingredient'>Save Recipe</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;