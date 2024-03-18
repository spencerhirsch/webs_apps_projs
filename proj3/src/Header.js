import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Customer from './components/Customer';
import CustomerTable from './components/CustomerTable';
import Products from './components/Products';
import ProductGrid from './components/ProductGrid';
import Gang from './components/Gang';
import Navigation from './components/Navigation';

const Header = () => {
    const [component, setComponent] = useState('products');

    return (
        <Router>
            <header className="App-header">
                <title>Products</title>
                <h1>Inventory Management System (IMS)</h1>
                <Navigation setComponent={setComponent} />
            </header>
            <div className='App-body'>
                <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="/customer" element={<Customer />} />
                    <Route path="/gang" element={<Gang />} />
                </Routes>
                {component === 'products' && <ProductGrid />}
                {component === 'customer' && <CustomerTable />}
                {/* Add gang component here */}
            </div>
        </Router>
    );
}

export default Header;
