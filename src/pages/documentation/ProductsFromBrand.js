import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  let { brandid } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products_from_brand/${brandid}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setProducts(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  console.log(brandid);
  console.log(products);

  return (
    <div>
      <h1>Products from Brand</h1>
    </div>
  );
}
export default ProductList;
