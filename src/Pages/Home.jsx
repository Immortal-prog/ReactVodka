import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../Components/Categoties';
import Sort from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock';
import PizzaBlockSkeleton from '../Components/PizzaBlockSkeleton';
import Pagination from '../Components/Pagination';
import { searchContext } from '../App';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

const categoryNames = ['Все', 'Пиво', 'Вино', 'Коньяк', 'Горілка', 'Віскі'];
const sortBy = [
  { name: 'популярністю', sortProp: 'raiting' },
  { name: 'алфавітом', sortProp: 'title' },
  { name: 'більшою ціною', sortProp: 'price' },
  { name: 'меншою ціною', sortProp: '-price' },
];

function Home() {
  const { categoryId, sort, currentPage } = useSelector((state) => state.filterSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { searchValue } = React.useContext(searchContext);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const axiosPizzas = async () => {
    setIsLoading(true);

    const order = `${sort.sortProp.includes('-') ? 'asc' : 'desc'}`;
    const search = searchValue ? `&search=${searchValue}` : '';
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    // fetch(
    //   `https://62dd5df1ccdf9f7ec2c5f699.mockapi.io/pizzas?${
    //     categoryId > 0 ? `category=${categoryId}` : ''
    //   }&sortBy=${sort.sortProp.replace('-', '')}&order=${order}${search}&page=1&limit=4`,
    // )
    //   .then((resolve) => resolve.json())
    //   .then((arr) => {
    //     setItems(arr);
    //     setIsLoading(false);
    //   });

    // axios
    //   .get(
    //     `https://62dd5df1ccdf9f7ec2c5f699.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sort.sortProp.replace(
    //       '-',
    //       '',
    //     )}&order=${order}${search}`,
    //   )
    //   .then((res) => {
    //     setItems(res.data);
    //     setIsLoading(false);
    //   });

    const res = await axios.get(
      `https://62dd5df1ccdf9f7ec2c5f699.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sort.sortProp.replace(
        '-',
        '',
      )}&order=${order}${search}`,
    );

    setItems(res.data);
    setIsLoading(false);
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProp: sort.sortProp,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProp, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortBy.find((obj) => obj.sortProp === params.sortProp);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      axiosPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProp, searchValue, currentPage]);

  const onChangePage = (number) => dispatch(setCurrentPage(number));

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortBy.find((obj) => obj.sortProp === params.sortProp);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  const pizzas = items.map((pizzas, index) => <PizzaBlock key={index} items={pizzas} />);

  const sceletons = [...new Array(8)].map((_, i) => <PizzaBlockSkeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories items={categoryNames} value={categoryId} onClickCategory={onClickCategory} />
        <Sort sortPopup={sortBy} />
      </div>
      <h2 className="content__title">Надмірне споживання алкоголю шкодить вашому здоров'ю</h2>
      <div className="content__items">{isLoading ? sceletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangepage={onChangePage} />
    </div>
  );
}

export default Home;
