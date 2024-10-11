import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  let { brandid } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL3}/products_from_brand/${brandid}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setProducts(result);
        },
        (error) => {
          console.log(error);
        },
      );
  }, []);

  return (
    <div className="wrapper">
      <h1>Products from Brand</h1>
      <h2>{brandid}</h2>
      <ul>
        {products.map((product) => (
          <li key={product.product_id}>
            <Link
              to={`/product/${product.product_id}/bom/${product.product_id}/`}
            >
              {" "}
              {product.product_description}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ProductList;
