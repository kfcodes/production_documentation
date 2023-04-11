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

  
  return (
    <div>
    {itemId}
    </div>
  );
}
