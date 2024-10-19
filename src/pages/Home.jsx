import React from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

import { setCategoryId, setCurrentCount } from "../redux/slices/filterSlice";
import { SearchContext } from "../App";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const sortType = sort.sortProperty;
  // const sortType = useSelector((state) => state.filter.sort.sortProperty);

  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [categoryId, setCategoryId] = React.useState(0);
  // const [currentPage, setCurrentPage] = React.useState(1);
  // const [sortType, setSortType] = React.useState({
  //   name: "популярности",
  //   sortProperty: "rating",
  // });

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentCount(number));
  };

  React.useEffect(() => {
    setIsLoading(true);
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    // fetch(
    //   `https://670d19eb073307b4ee424abc.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    // )
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     setItems(json);
    //     setIsLoading(false);
    //   });

    axios
      .get(
        `https://670d19eb073307b4ee424abc.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((response) => {
        setItems(response?.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = Array.isArray(items)
    ? items.map((obj) =>
        obj && obj.id ? <PizzaBlock key={obj.id} {...obj} /> : null
      )
    : null;

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};

export default Home;
