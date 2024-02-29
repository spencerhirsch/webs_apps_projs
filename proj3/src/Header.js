import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Customer from './components/Customer';
import Products from './components/Products';
import Gang from './components/Gang';
import Navigation from './components/Navigation';

const Header = () => {
    return (
        <Router>
            <header className="App-header">
                <title>Products</title>
                <h1>Inventory Management System (IMS)</h1>
                <Navigation />
            </header>
            <div className='App-body'>
                <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="/customer" element={<Customer />} />
                    <Route path="/gang" element={<Gang />} />
                </Routes>
            </div>
        </Router>
    );
}

export default Header;