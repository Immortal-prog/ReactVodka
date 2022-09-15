import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './Styles/app.scss';

import Header from './Components/Header';
import Home from './Pages/Home';
import CartEmpty from './Pages/NotFound';
import Cart from '../src/Pages/Cart';

export const searchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="wrapper">
      <searchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="" element={<Home />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="*" element={<CartEmpty />}></Route>
          </Routes>
        </div>
      </searchContext.Provider>
    </div>
  );
}

export default App;
