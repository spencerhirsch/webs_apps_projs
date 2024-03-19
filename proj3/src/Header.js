import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerAnalytics from './components/CustomerAnalytics';
import Products from './components/Products';
import Team from './components/Team.js'
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
                    <Route path="/customer" element={<CustomerAnalytics />} />
                    <Route path="/team" element={<Team />} />
                </Routes>
            </div>
        </Router>
    );
}

export default Header;
