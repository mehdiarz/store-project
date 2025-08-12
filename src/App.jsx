import { Navigate, Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import PageNotFound from "./pages/404.jsx";
import ProductProvider from "./context/ProductContext.jsx";

function App() {
  return (
    <ProductProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<DetailsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ProductProvider>
  );
}

export default App;
