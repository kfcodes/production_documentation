import React, { useEffect, useState } from "react";

function BrandList() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4040/brands/list")
      .then((res) => res.json())
      .then(
        (result) => {
          setBrands(result.data);
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
        {brands.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
export default BrandList;
