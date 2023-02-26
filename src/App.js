import { Routes, Route } from "react-router-dom";
import PalletList from "./pages/AllPallets";

// Added the products by brand page to react router
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PalletList />} />
      </Routes>
    </>
  );
}

export default App;
