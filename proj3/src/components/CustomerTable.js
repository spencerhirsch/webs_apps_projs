import React, { useState, useEffect } from 'react';
import '../css/CustomerTableStyle.css';

const CustomerTable = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('customers.json') // Placed data in /public/ directory because you cannot import from outside src, use fetch to get it from public
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setItems(data);
      })
      .catch(error => console.error("Failed to load products.json:", error));
  }, []);

  return (
    <table className="customer-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Email</th>
          <th>Revenue</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={item.login.uuid}>
            <td>{`${item.name.title} ${item.name.first} ${item.name.last}`}</td>
            <td>{`${item.location.street.number} ${item.location.street.name}, ${item.location.city}, ${item.location.state}, ${item.location.country}, ${item.location.postcode}`}</td>
            <td>{item.email}</td>
            <td>TBA</td>
            <td><img src={item.picture.thumbnail} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerTable;
