import './App.css';
import React from 'react'
import Header from "./Header";
import ProductGrid from './components/ProductGrid';

function App() {
  return (
      <div className='App'>
        <Header />
        <ProductGrid />
      </div>
  );
}

export default App;
