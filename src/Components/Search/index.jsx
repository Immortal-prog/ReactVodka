import React from 'react';
import style from './Search.module.scss';
import { searchContext } from '../../App';
import debounce from 'lodash.debounce';

function Search() {
  const [value, setValue] = React.useState('');
  const { setSearchValue } = React.useContext(searchContext);
  const inpuRef = React.useRef();

  const onClearInput = () => {
    setValue('');
    setSearchValue('');
    inpuRef.current.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 1000),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={style.root}>
      <svg className={style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
      </svg>
      <input
        ref={inpuRef}
        value={value}
        onChange={onChangeInput}
        className={style.input}
        placeholder="Знайдіть алкоголь на ваш смак...."
      />
      {value && (
        <svg
          onClick={onClearInput}
          className={style.xmark}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512">
          <path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
        </svg>
      )}
    </div>
  );
}

export default Search;
