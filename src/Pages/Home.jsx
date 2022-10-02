import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../Components/Categoties';
import Sort from '../Components/Sort';
import AlcoBlock from '../Components/AlcoBlock';
import AlcoholBlockSkeleton from '../Components/AlcoholBlockSkeleton';
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
        categoryId: categoryId > 0 ? categoryId : 0,
        sortProp: sort.sortProp,
        currentPage,
      };

      const queryString = qs.stringify(params, { skipNulls: true });

      navigate(`/?${queryString}`);
    }

    if (window.location.search) {
      axiosItems();
    }
  }, [categoryId, sort.sortProp, searchValue, currentPage]);

  React.useEffect(() => {
    getItems();
  }, [categoryId, sort.sortProp, searchValue, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortBy.find((obj) => obj.sortProp === params.sortProp);
      if (sort) {
        params.sort = sort;
      }
      dispatch(setFilters(params));
    }
    isMounted.current = true;
  }, []);

  const alcohols = alcoholItems.map((alcohol, index) => <AlcoBlock key={index} items={alcohol} />);

  const sceletons = [...new Array(8)].map((_, i) => <AlcoholBlockSkeleton key={i} />);

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
        <div className="content__items">{status === 'loading' ? sceletons : alcohols}</div>
      )}

      <Pagination currentPage={currentPage} onChangepage={onChangePage} />
    </div>
  );
}

export default Home;
