import React from "react";
import PalletItem from "./SinglePalletItem";
import { useSubmitData } from "../../../hooks/useSubmitData";

export default function SinglePalletItemsList({ pallet_id, palletItems, setNewPalletItemsFunction }) {
  const { loading: submitLoading, error: submitError, success, submitData } = useSubmitData(
    `${process.env.REACT_APP_API_URL3}/pallet_item`,
    "POST" // Or "PUT" depending on your use case
  );

  const handleSavePalletItem = (itemData) => {
    submitData(itemData);
  };

  return (
    <div>
      {palletItems.map((item) => (
        <PalletItem
          key={item.item_id}
          product={item}
          onSave={handleSavePalletItem}
          submitLoading={submitLoading}
          submitError={submitError}
        />
      ))}
      {success && <div>Item saved successfully!</div>}
    </div>
  );
}
