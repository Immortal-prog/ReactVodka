import React from 'react';
import style from './NotFound.module.scss';

function CartEmpty() {
  return (
    <div className={style.root}>
      <h1>
        <b>Сторінку не знайдено :(</b>
      </h1>
    </div>
  );
}
export default CartEmpty;
