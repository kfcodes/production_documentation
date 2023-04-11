import React, { useState } from "react";

export default function IndividualPalletItem(product) {
  const [itemId, setItemId] = useState(0);
setItemId(product.product.item_id);

  
  return (
    <div>
    {itemId}
    </div>
  );
}
