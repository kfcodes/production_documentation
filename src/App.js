import { Routes, Route } from "react-router-dom";
import PalletList from "./components/pallets/palletLists/RecentPalletsList";
import FullPalletList from "./components/pallets/palletLists/AllPalletsList";
import CreatePalletItem from "./components/pallets/singlePalletDetails/SinglePalletItemsList";
import CreateNewPalletButton from "./components/pallets/buttons/CreateNewPalletButton";
import SinglePallet from "./components/pallets/singlePalletDetails/SinglePalletDetails";
import Mps from "./components/productionSchedule/CurrentProduction";
import FullMps from "./components/productionSchedule/TotalProduction";
import DragDropFile from "./components/uploadGS1/UploadPDFLables";
import UploadDataFiles from "./components/uploadData/UploadDataFiles";
import LatestPallets from "./components/pallets/palletLists/LatestPallets";
import SearchPallets from "./components/pallets/searchPalletModal/SearchPallet";
import FinishedProduct from "./components/finishedProducts/FinishedProduct";

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
        <Route path="upload_Data/" element={<UploadDataFiles />} />
        <Route path="latest_pallets/" element={<LatestPallets />} />
        <Route path="search_pallet/" element={<SearchPallets />} />
      </Routes>
    </>
  );
}

export default App;
