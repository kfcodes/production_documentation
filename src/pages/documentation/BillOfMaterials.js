import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Singlebom() {
  let { productid } = useParams();

console.log(productid);

  return (
    <div className="wrapper">
      <h1>Product Components</h1>
    </div>
  );
}
export default Singlebom;
