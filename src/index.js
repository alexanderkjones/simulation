import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SelectedProduct from './Context/SelectedProduct';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Model from './Components/Babylon/Model';
import { configureStore } from '@reduxjs/toolkit';
import facesReducer from './Context/redux.js';
import { Provider } from 'react-redux';

export const store = configureStore({
  reducer: {
    selected: facesReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <SelectedProduct>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/editor' element={<Model number={2} />} />
        </Routes>
      </Provider>
    </SelectedProduct>
  </BrowserRouter>
);
