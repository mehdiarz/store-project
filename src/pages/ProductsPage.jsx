import { useProducts } from "../context/ProductContext.jsx";

import styles from "./ProductsPage.module.css";
import Card from "../components/Card.jsx";
import Loader from "../components/Loader.jsx";
import { useEffect, useState } from "react";
import { ImSearch } from "react-icons/im";
import { FaListUl } from "react-icons/fa";
import {
  createQueryObject,
  filterProducts,
  searchProducts,
} from "../helper/helper.js";
import { useSearchParams } from "react-router-dom";

const ProductsPage = () => {
  const products = useProducts();

  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setDisplayed(products);
  }, [products]);

  useEffect(() => {
    setSearchParams(query);
    let finalProducts = searchProducts(products, query.search);
    finalProducts = filterProducts(finalProducts, query.category);
    setDisplayed(finalProducts);
  }, [query]);

  const searchHandler = () => {
    setQuery(createQueryObject(query, { search }));
  };

  const categoryHandler = (event) => {
    const { tagName } = event.target;
    const category = event.target.innerText.toLowerCase();
    if (tagName !== "LI") {
      return;
    }
    setQuery(createQueryObject(query, { category }));
  };
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase().trim())}
        />
        <button onClick={searchHandler}>
          <ImSearch />
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.products}>
          {!displayed.length && <Loader />}
          {displayed.map((product) => (
            <Card key={product.id} data={product}></Card>
          ))}
        </div>
        <div>
          <div>
            <FaListUl />
          </div>
          <ul onClick={categoryHandler}>
            <li>All</li>
            <li>Electronics</li>
            <li>Jewelery</li>
            <li>Men's Clothing</li>
            <li>Women's Clothing</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
