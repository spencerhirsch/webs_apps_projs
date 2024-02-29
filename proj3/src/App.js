import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Customer from './components/Customer';
import Products from './components/Products';
import Gang from './components/Gang';
import Navigation from './components/Navigation';


function App() {
  return (    
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
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
