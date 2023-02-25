import { Routes, Route } from "react-router-dom";
import BrandList from "./pages/brands.js";

// Added the products by brand page to react router
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BrandList />} />
      </Routes>
    </>
  );
}

export default App;
