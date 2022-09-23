import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './Styles/app.scss';

import Header from './Components/Header';
import Home from './Pages/Home';
import CartEmpty from './Pages/NotFound';
import Cart from '../src/Pages/Cart';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="*" element={<CartEmpty />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
