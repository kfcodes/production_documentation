import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BrandList() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/brands/`)
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
      <h1>All Brands</h1>
      <ul>
        {brands.map((brand) => (
          <li key={brand.id}>
          <Link to={`/brand/${brand.prefix}`}><p> {brand.prefix} - {brand.name}</p></Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BrandList;
