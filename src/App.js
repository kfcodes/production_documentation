import { Routes, Route } from "react-router-dom";
import PalletList from "./components/pallets/RecentPalletsList";
import FullPalletList from "./components/pallets/AllPalletsList";
import CreatePalletItem from "./components/pallets/PalletItem";
import CreateNewPalletButton from "./components/pallets/CreateNewPalletButton";
import SinglePallet from "./components/pallets/Pallet";
import Mps from "./components/production/CurrentProduction";
import FullMps from "./components/production/TotalProduction";
import DragDropFile from "./components/labels/UploadPDFLables";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PalletList />} />
        <Route path="/all_pallets" element={<FullPalletList />} />
        <Route path="create_New_pallet" element={<CreateNewPalletButton />}/>
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
