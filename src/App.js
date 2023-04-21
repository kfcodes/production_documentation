import { Routes, Route } from "react-router-dom";
import PalletList from "./pages/pallets/RecentPallets";
import FullPalletList from "./pages/pallets/AllPallets";
import CreatePalletItem from "./pages/pallets/CreatePalletItem";
import CreateNewPallet from "./pages/pallets/CreatePallet";
import SinglePallet from "./pages/pallets/Pallet";
import Mps from "./pages/production/CurrentProduction";
import FullMps from "./pages/production/TotalProduction";
import DragDropFile from "./pages/labels/UploadPDFLables";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PalletList />} />
        <Route path="/all_pallets" element={<FullPalletList />} />
        <Route path="create_New_pallet" element={<CreateNewPallet />}/>
        <Route path="pallet/:palletid" element={<SinglePallet />}>
          <Route path="pallet_item" element={<CreatePalletItem />} />
        </Route>
        <Route path="mps/" element={<Mps />} />
        <Route path="full_mps/" element={<FullMps />} />
        <Route path="upload_pdf/" element={<DragDropFile />} />
      </Routes>
    </>
  );
}

export default App;
