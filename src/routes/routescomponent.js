import { Routes, Route } from "react-router-dom";
import Header from "../components/header/Header"
import PalletList from "../pages/ProductionHomePage"
import SinglePalletPage from "../pages/IndividualPallet";
import PackingListsPage from "../pages/PackingListHomePage";
import PackingListHeader from "../pages/IndividualPackingList";

const RoutesComponent = () => {
  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <Routes>
        <Route path="/" element={<PalletList />} />
        <Route path="pallet/:palletid" element={<SinglePalletPage />} />
        <Route path="/packing_lists" element={<PackingListsPage />} />
        <Route path="/packing_list/:id" element={<PackingListHeader />} />
      </Routes >
    </>
  );
}
// <Route path="pallet_item" element={<CreatePalletItem />} />

export default RoutesComponent;
