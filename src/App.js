import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import BrandList from "./pages/brands.js";
import BrandList2 from "./pages/brands2.js";
import BrandList3 from "./pages/brands3.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BrandList />} />
        <Route path="brands2" element={<BrandList2 />} />
        <Route path="brands3" element={<BrandList3 />} />
      </Routes>
    </>
  );
}

export default App;
