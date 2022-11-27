import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import BrandList from "./pages/brands.js";
import ProductList from "./pages/products.js";
import Productsfrombrand from "./pages/products_from_brand.js";

// Added the products by brand page to react router
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BrandList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:brandId" element={<Productsfrombrand />} />
      </Routes>
    </>
  );
}

export default App;
