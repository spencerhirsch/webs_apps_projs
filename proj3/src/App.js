import './App.css';
import React from 'react'
import Header from "./Header";
import ProductGrid from './components/ProductGrid';
import CustomerTable from './components/CustomerTable';

function App() {
  return (
      <div className='App'>
        <Header />
        <CustomerTable />
      </div>
  );
}

export default App;
