import { Routes, Route } from "react-router-dom";
import PalletList from "../components/pallets/palletLists/RecentPalletsList";
// import FullPalletList from "../components/pallets/palletLists/AllPalletsList";
import CreatePalletItem from "../components/pallets/singlePalletDetails/SinglePalletItemsList";
// import SinglePallet from "../components/pallets/singlePalletDetails/SinglePalletDetails";
import SinglePallet from "../pages/SinglePalletPage";
import Header from "../components/header/Header"

const RoutesComponent = () => {
  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <Routes>
        <Route path="/" element={<PalletList />} />
        <Route path="pallet/:palletid" element={<SinglePallet />}>
          <Route path="pallet_item" element={<CreatePalletItem />} />
        </Route>
      </Routes>
    </>
  );
}

export default RoutesComponent;
