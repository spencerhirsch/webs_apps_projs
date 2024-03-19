import React, { useState, useEffect } from 'react';
import ItemCard from './Product';
import '../Grid.css';

const Products = () => {
    const [items, setItems] = useState([]);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch('products.json') // Placed data in /public/ directory because you cannot import from outside src, use fetch to get it from public
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Failed to load products.json:', error));

        fetch('customers.json') // Placed data in /public/ directory because you cannot import from outside src, use fetch to get it from public
            .then(response => response.json())
            .then(data => setCustomers(data))
            .catch(error => console.error('Failed to load customers.json:', error));
    }, []);

    const [showCard, setShowCard] = useState(false); // State to control the visibility of the card
    const [selectedItem, setSelectedItem] = useState(null);

    // Function to handle click on learn more
    const handleLearnMore = (item) => {
        setSelectedItem(item);
        setShowCard(true);
    };

    return (
        <main className='App-body'>
            <h2>Products</h2>

            {/* Repeat 7 times for the 7 columns */}
            <section className='Grid-row Grid-header' style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
                {/* Header columns */}
                <div>Title</div>
                <div className='Grid-numeric'>Price</div>
                <div>Category</div>
                <div>Rating</div>
                <div className='Grid-numeric'>Inventory</div>
                <div className='Grid-numeric'>Revenue</div>
                <div></div>
            </section>

            {items.map(item => (
                // Repeat 7 times for the 7 columns
                <section className='Grid-row Grid-data' style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
                    {/* Item data */}
                    <div>{item.title}</div>
                    <div className='Grid-numeric'>{item.price.toFixed(2)}</div>
                    <div>{item.category}</div>
                    <div>{item.rating.rate.toFixed(1)}</div>
                    <div className='Grid-numeric'>{item.inventory}</div>
                    <div className='Grid-numeric'>
                        {(customers.reduce((total, elem) => {
                            // Assume there won't be multiple, separate records for the same product ID
                            const purchase = elem.purchases.find(elem => elem.productID === item.id);
                            // Purchase will be undefined if the customer didn't buy this specific item
                            const quantity = purchase ? purchase.quantity : 0;
                            // Accumulate running total of number sold
                            return total + quantity;
                        }, 0) * item.price).toLocaleString()}
                    </div>
                    <div>
                        <button onClick={() => handleLearnMore(item)}>Learn More</button>
                    </div>
                </section>
            ))}
            {showCard && <ItemCard item={selectedItem} onClose={() => setShowCard(false)} />}
        </main>
    );
}

export default Products;

