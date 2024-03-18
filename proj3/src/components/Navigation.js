import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ setComponent }) => {
    return (
        <nav>
          <ul>
            <li>
                <Link to="/" onClick={() => setComponent('products')}>Products</Link>
            </li>
            <li>
              <Link to="/customer" onClick={() => setComponent('customer')}>Customer Analytics</Link>
            </li>
            <li>
                <Link to="/gang" onClick={() => setComponent('gang')}>The Team</Link>
            </li>
          </ul>
        </nav>
    );
}

export default Navigation;
