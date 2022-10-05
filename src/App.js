import React, { useState } from "react";

import BrandList from "./brands.js";

function App() {
  // const [brand, setBrand] = useState(["shut", "up"]);
  // return <brandList brand={brand} />;
  return (
    <>
      <h1>This is A list of the brands in the Database</h1>
      <BrandList />
    </>
  );
}

export default App;
