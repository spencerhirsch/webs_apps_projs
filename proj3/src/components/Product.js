import React from 'react';
import './Card.css'; 

const ItemCard = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="Card-overlay">
      <div className="Card">
        <button className="Card-close" onClick={onClose}>X</button>
        <img className="Card-image" src={item.image} alt={item.title} />
        <h3 className="Card-title">{item.title}</h3>
        <p className="Card-price">${item.price}</p>
        <p className="Card-category"><span className="Card-label">Category:</span> {item.category}</p>
        <p className="Card-rating"><span className="Card-label">Rating:</span> {item.rating.rate}</p>
        <p className="Card-stock"><span className="Card-label">In Stock:</span> {item.inventory}</p>
      </div>
    </div>
  );
};

export default ItemCard;
