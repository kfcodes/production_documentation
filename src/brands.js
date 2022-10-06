import React, { useEffect, useState } from "react";

function BrandList() {
  const [brands, setBrands] = useState(["test1", "test2"]);

  useEffect(() => {
    fetch("http://localhost:4040/brands/list")
      .then((res) => res.json())
      .then(
        (result) => {},
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <ul>
      {brands.map((brand) => (
        <p>{brand}</p>
      ))}
    </ul>
  );
}
export default BrandList;
