const shortenText = (text) => {
  return text.split(" ").slice(0, 3).join(" ");
};

const searchProducts = (products, searchTerm) => {
  if (!searchTerm) {
    return products;
  }
  const searchProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(searchTerm);
  });
  return searchProducts;
};

const filterProducts = (products, category) => {
  if (!category) {
    return products;
  }
  const filteredproducts = products.filter((product) => {
    return product.category === category;
  });
  return filteredproducts;
};

const createQueryObject = (currentQuery, newQuery) => {
  if (newQuery.category === "all") {
    const { category, ...rest } = currentQuery;
    return rest;
  }
  if (newQuery.search === "") {
    const { search, ...rest } = currentQuery;
    return rest;
  }
  return { ...currentQuery, ...newQuery };
};

const getInitialQuery = (searchParams) => {
  const query = {};
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  if (category) {
    query.category = category;
  }
  if (search) {
    query.search = search;
  }
  return query;
};

export {
  shortenText,
  searchProducts,
  filterProducts,
  createQueryObject,
  getInitialQuery,
};
