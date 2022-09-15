import React from 'react';

function Categoties({ items, value, onClickCategory }) {
  return (
    <div className="categories">
      <ul>
        {items.map((category, index) => (
          <li
            className={value === index ? 'active' : ''}
            onClick={() => onClickCategory(index)}
            key={`${category}_${index}`}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categoties;
