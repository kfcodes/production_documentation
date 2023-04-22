
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";

function Singlebom() {
  const [bom, setBom] = useState([]);
  let { productid } = useParams();
  // const url = process.env.REACT_APP_API_URL;
  // const url = "http://localhost:4040"
  // console.log(url);
    // fetch(`http://localhost:4040/bom/${productid}`)
    // fetch(`${url}/bom/${productid}`)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/bom/${productid}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setBom(result);
          console.log(result);
          // console.log(`${process.env.REACT_APP_API_URL}/bom/${productid}`);
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
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Singlebom;
