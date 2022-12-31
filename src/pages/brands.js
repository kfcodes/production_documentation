import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BrandList() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4040/brands/")
      .then((res) => res.json())
      .then(
        (result) => {
          setBrands(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <div className="wrapper">
      <h1>Brands</h1>
      <ul>
        {brands.map((brand) => (
          <li key={brand.id}>
            <Link to="/products_from_brand">
              {brand.id} - {brand.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default BrandList;
