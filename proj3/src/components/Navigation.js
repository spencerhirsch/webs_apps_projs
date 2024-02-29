import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav>
          <ul>
            <li>
                <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/customer">Customer Analytics</Link>
            </li>
            <li>
                <Link to="/gang">The Team</Link>
            </li>
          </ul>
        </nav>
    );
}

export default Navigation;

