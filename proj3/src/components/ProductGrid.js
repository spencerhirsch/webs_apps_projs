import React, { useState, useEffect } from 'react';

const ProductGrid = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('products.json') // Placed data in /public/ directory because you cannot import from outside src, use fetch to get it from public
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error("Failed to load products.json:", error));
  }, []);

  return (
    // Grid layout
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', padding: '20px' }}>
      {items.map(item => (
        // Mapping data to card layout
        <div key={item.id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
          <img src={item.image} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
          <h3>{item.title}</h3>
          <p>${item.price}</p>
          <p>{item.description}</p>
          <p>Rating: {item.rating.rate} ({item.rating.count} reviews)</p>
          <p>Inventory: {item.inventory}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
