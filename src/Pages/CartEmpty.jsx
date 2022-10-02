import React from 'react';
import emptyCart from '../assets/Img/cart.png';
import { Link } from 'react-router-dom';

function CartEmpty() {
  return (
    <>
      <div className="cart cart--empty">
        <h2>
          Кошик порожній <icon>😕</icon>
        </h2>
        <p>
          <br />
          Для того, щоб замовити алкоголь, перейдіть на головну сторінку.
        </p>
        <img src={emptyCart} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Повернутись назад</span>
        </Link>
      </div>
    </>
  );
}

export default CartEmpty;
