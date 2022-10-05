import React, { useState, useEffect } from "react";

// function brandList({ brand }) {
function BrandList() {
  // const [brands, setBrands] = useState([]);
  const [brands, setBrands] = useState(["test1", "test2"]);

  return (
    <ul>
      {brands.map((brand) => (
        <p> {brand}</p>
      ))}
    </ul>
  );
}
export default BrandList;
