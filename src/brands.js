import React from "react";

// function brandList({ brand }) {
function brandList() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch("https://api.example.com/brands")
      .then((res) => res.json())
      .then(
        (result) => {
          setBrands(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <ul>
      {brands.map((brand) => (
        <li key={brand.id}>
          {brand.name} {brand.price}
        </li>
      ))}
    </ul>
  );
}
export default brandList;
