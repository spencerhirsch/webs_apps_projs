import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav>
          <ul>
            <li>
                <Link to="/">Products</Link>
              {/* Products */}
            </li>
            <li>
              <Link to="/customer">Customer Analytics</Link>
              {/* Customer Analytics */}
            </li>
            <li>
                <Link to="/gang">The Team</Link>
              {/* The Team */}
            </li>
          </ul>
        </nav>
    );
}

export default Navigation;

// function Navigation() {
//     return (
//         <nav>
//           <ul>
//             <li>
//                 <Link to="/products">Products</Link>
//               {/* Products */}
//             </li>
//             <li>
//               <Link to="/customer">Customer Analytics</Link>
//               Customer Analytics
//             </li>
//             <li>
//                 <Link to="/gang">The Team</Link>
//               The Team
//             </li>
//           </ul>
//         </nav>
//     );
// }
