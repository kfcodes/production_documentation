import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import BrandList from "./pages/brands.js";
import ProductList from "./pages/products.js";

// Added the products page to react router
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BrandList />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </>
  );
}

export default App;
