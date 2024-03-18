import React, { useState, useEffect } from 'react';
import '../Grid.css';

const CustomerAnalytics = () => {
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

  return (
    <div className='App-body'>
      <h2>Customer Analytics</h2>

      {/* Repeat 5 times for the 5 columns */}
      <div className='Grid-row Grid-header' style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        <div>Name</div>
        <div>Address</div>
        <div>Email</div>
        <div className='Grid-numeric'>Revenue</div>
        <div></div>
      </div>

      {/* Customer data */}
      <tbody>
        {customers.map((cust, index) => (
          <div className='Grid-row Grid-data' key={cust.login.uuid} style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
            <div>{`${cust.name.title} ${cust.name.first} ${cust.name.last}`}</div>
            <div>{`${cust.location.street.number} ${cust.location.street.name}, ${cust.location.city}, ${cust.location.state}, ${cust.location.country}, ${cust.location.postcode}`}</div>
            <div>{cust.email}</div>
            <div className='Grid-numeric'>
              {cust.purchases.reduce((total, elem) => {
                // Assume there won't be multiple, separate records for the same product ID
                const item = items.find(x => x.id === elem.productID);
                // Accumulate running total of number sold
                return total + elem.quantity * item.price;
              }, 0).toLocaleString()}
            </div>
            <div><img src={cust.picture.thumbnail} alt='Profile' style={{ width: '50px', height: '50px', borderRadius: '50%' }} /></div>
          </div>
        ))}
      </tbody>
    </div>
  );
};

export default CustomerAnalytics;
