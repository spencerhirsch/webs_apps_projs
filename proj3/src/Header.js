import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Customer from './components/Customer';
import Products from './components/Products';
import Gang from './components/Gang';
import Navigation from './components/Navigation';

const Header = () => {
    return (
        <header className="App-header">
                <title>Products</title>
                <h1>Inventory Management System (IMS)</h1>
                <Router>
          {/* <div> */}
                    <Navigation />
                    <Routes>
                    <Route path="/" exact component={Products} />
                    <Route path="/customer" exact component={Customer} />
                    <Route path="/gang" exact component={Gang} />
                    </Routes>
            {/* </div> */}
                </Router>
        </header>
    );
}

export default Header;