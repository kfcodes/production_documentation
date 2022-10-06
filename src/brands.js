import React, { useEffect, useState } from "react";

function BrandList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4040/brands/list")
      .then((res) => res.json())
      .then(
        (result) => {
          setList(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <div className="wrapper">
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
export default BrandList;
