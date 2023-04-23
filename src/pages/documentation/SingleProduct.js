import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";

function SingleProduct() {
  const [product, setProduct] = useState([]);
  let { productid } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productid}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setProduct(result);
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <div className="wrapper">
      <h1>{product.product_id}</h1>
      <h2>{product.product_description}</h2>
      <p>Stock - {product.stock}</p>
      <p>Lot - {product.lot_example}</p>
      <p>BBE - {product.bbe_months} months</p>
      <p>Batch - {product.batch}</p>
      <p>Pallet Type - {product.pallet_name}</p>
      <Outlet context={[product.product_id]}/>
    </div>
  );
}
export default SingleProduct;
