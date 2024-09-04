import { Routes, Route } from "react-router-dom";
import Header from "../components/header/Header"
import PalletList from "../pages/PalletListPage"
import SinglePalletPage from "../pages/SinglePalletPage";
import PackingListsPage from "../pages/PackingListsPage";

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
      </Routes >
    </>
  );
}
// <Route path="pallet_item" element={<CreatePalletItem />} />

export default RoutesComponent;
