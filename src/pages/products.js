import React, { useEffect, useState } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4040/products/list")
      .then((res) => res.json())
      .then(
        (result) => {
          setProducts(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <div className="wrapper">
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.product_id}>{product.product_description}</li>
        ))}
      </ul>
    </div>
  );
}
export default ProductList;
