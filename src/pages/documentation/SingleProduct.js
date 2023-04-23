import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleProduct() {
  let { productid } = useParams();


  return (
    <div className="wrapper">
      <h1>{productid}</h1>
    </div>
  );
}
export default SingleProduct;
