import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SelectedProduct from './Context/SelectedProduct';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SelectedProduct>
    <App />
  </SelectedProduct>
);
