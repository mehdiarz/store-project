import { useProducts } from "../context/ProductContext.jsx";

import styles from "./ProductsPage.module.css";
import Card from "../components/Card.jsx";
import Loader from "../components/Loader.jsx";
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import {
  filterProducts,
  getInitialQuery,
  searchProducts,
} from "../helper/helper.js";
import { useSearchParams } from "react-router-dom";
import SearchBox from "../components/SearchBox.jsx";

const ProductsPage = () => {
  const products = useProducts();

  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setDisplayed(products);
    setQuery(getInitialQuery(searchParams));
  }, [products]);

  useEffect(() => {
    setSearchParams(query);
    setSearch(query.search || "");
    let finalProducts = searchProducts(products, query.search);
    finalProducts = filterProducts(finalProducts, query.category);
    setDisplayed(finalProducts);
  }, [query]);

  return (
    <>
      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery} />
      <div className={styles.container}>
        <div className={styles.products}>
          {!displayed.length && <Loader />}
          {displayed.map((product) => (
            <Card key={product.id} data={product}></Card>
          ))}
        </div>
        <SideBar query={query} setQuery={setQuery} />
      </div>
    </>
  );
};

export default ProductsPage;
