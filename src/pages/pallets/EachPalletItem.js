// import { useForm } from "react-hook-form";
// import { useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function IndividualPalletItem(product) {
  const [itemId, setItemId] = useState(0);
  const [palletId, setPalletId] = useState(0);
  const [productId, setProductId] = useState(product.pallet_item_product_id);
  const [lot, setLot] = useState(product.lot);
  const [bbe, setBbe] = useState(product.bbe);
  const [batch, setBatch] = useState(product.batch);
  const [quantity, setQuantity] = useState(product.quantity);
setItemId(product.product.item_id);
setPalletId(product.product.pallet_item_pallet_id);
setLot(product.product.lot);
setBbe(product.product.bbe);
setBatch(product.product.batch);
setQuantity(product.product.quantity);

  const onSubmit = (event) => {
    event.preventDefault();
    let palletItemData = {
      pallet_item_pallet_id: event.target[0].value,
      pallet_item_product_id: event.target[1].value,
      lot: event.target[2].value,
      bbe: event.target[3].value,
      batch: event.target[4].value,
      quantity: event.target[5].value,
      item_id: event.target[6].value,
    };
    // console.log("This is the pallet Item Data");
    // console.log(palletItemData);
    fetch(`${process.env.REACT_APP_API_URL}/pallet_item/${itemId}`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(palletItemData),

  
  return (
    <div>
    {itemId}
    </div>
  );
}
