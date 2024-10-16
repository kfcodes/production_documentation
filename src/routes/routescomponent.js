import { Routes, Route } from "react-router-dom";
import Header from "../components/header/Header"
import PalletList from "../pages/PalletListPage"
import SinglePalletPage from "../pages/SinglePalletPage";
import PackingListsPage from "../pages/PackingListsPage";
import PackingListHeader from "../pages/individualPackingListData";

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
