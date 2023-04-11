import { Routes, Route } from "react-router-dom";
import PalletList from "./pages/pallets/AllPallets";
import CreatePalletItem from "./pages/pallets/CreatePalletItem";
import SinglePallet from "./pages/pallets/Pallet";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PalletList />} />
        <Route path="pallet/:palletid" element={<SinglePallet />}>
          <Route path="pallet_item" element={<CreatePalletItem />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
