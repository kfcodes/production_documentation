import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Singlebom() {
  const [bom, setBom] = useState([]);
  let { productid } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/bom/${productid}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setBom(result);
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <div className="wrapper">
      <h1>Product Components</h1>
      <h2>{bom.product_description}</h2>
      <ul>
        {bom.map((component) => (
          <li key={component.component_id}>
            <h3>{component.product_description}</h3>
            <p>sage code - {component.component_id} </p> 
                <p> quantity - {component.quantity} </p>
                <p> stock - {component.stock}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Singlebom;
