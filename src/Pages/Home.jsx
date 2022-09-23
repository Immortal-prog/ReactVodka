import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../Components/Categoties';
import Sort from '../Components/Sort';
import AlcoBlock from '../Components/AlcoBlock';
import PizzaBlockSkeleton from '../Components/PizzaBlockSkeleton';
import Pagination from '../Components/Pagination';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { axiosItems } from '../redux/slices/responceSlice';

const categoryNames = ['Все', 'Пиво', 'Вино', 'Коньяк', 'Горілка', 'Віскі'];
const sortBy = [
  { name: 'популярністю', sortProp: 'raiting' },
  { name: 'алфавітом', sortProp: 'title' },
  { name: 'більшою ціною', sortProp: 'price' },
  { name: 'меншою ціною', sortProp: '-price' },
];

function Home() {
  const { categoryId, sort, currentPage, searchValue } = useSelector((state) => state.filterSlice);
  const { alcoholItems, status } = useSelector((state) => state.responce);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (currentPage) => {
    dispatch(setCurrentPage(currentPage));
  };

  const getItems = async () => {
    const order = `${sort.sortProp.includes('-') ? 'asc' : 'desc'}`;
    const search = searchValue ? `&search=${searchValue}` : '';
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    dispatch(
      axiosItems({
        order,
        search,
        category,
        currentPage,
        sort,
      }),
    );
    window.scrollTo(0, 0);
  };
  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        categoryId: categoryId > 0 ? categoryId : null,
        sortProperty: sort.sortProperty,
        currentPage,
      };

      const queryString = qs.stringify(params, { skipNulls: true });

      navigate(`/?${queryString}`);
    }
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  React.useEffect(() => {
    getItems();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // Парсим параметры при первом рендере
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
  //     if (sort) {
  //       params.sort = sort;
  //     }
  //     dispatch(setFilters(params));
  //   }
  //   isMounted.current = true;
  // }, []);

  const pizzas = alcoholItems.map((pizzas, index) => <AlcoBlock key={index} items={pizzas} />);

  const sceletons = [...new Array(8)].map((_, i) => <PizzaBlockSkeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories items={categoryNames} value={categoryId} onClickCategory={onClickCategory} />
        <Sort sortPopup={sortBy} />
      </div>
      <h2 className="content__title">Надмірне споживання алкоголю шкодить вашому здоров'ю</h2>
      {status === 'error' ? (
        <div>Помилка при завантаженні</div>
      ) : (
        <div className="content__items">{status === 'loading' ? sceletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangepage={onChangePage} />
    </div>
  );
}

export default Home;
