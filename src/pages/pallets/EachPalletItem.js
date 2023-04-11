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

  // const onSubmit = (event) => {
  //   event.preventDefault();
  //   let palletItemData = {
  //     pallet_item_pallet_id: event.target[0].value,
  //     pallet_item_product_id: event.target[1].value,
  //     lot: event.target[2].value,
  //     bbe: event.target[3].value,
  //     batch: event.target[4].value,
  //     quantity: event.target[5].value,
  //     item_id: event.target[6].value,
  //   };
  //   // console.log("This is the pallet Item Data");
  //   // console.log(palletItemData);
  //   fetch(`${process.env.REACT_APP_API_URL}/pallet_item/${itemId}`, {
  //     method: "put",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(palletItemData),
  //     This is where the component ends
  //
  //
  //
  //
      //   fetch(`${process.env.REACT_APP_API_URL}/pallet/${pallet_id}`, {
      //     method: "put",
      //     mode: "cors",
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(palletData),
      //   })
      // .then((res) => res.json())
      // .then((json) => console.log(json));
  //
  //
  //
  //   There is the end of the component herer
  //   
  //   }).then((response) => {
  //     console.log(response);
  //   });
  // };

    // console.log("Product Details");
    // console.log(product);
    // console.log("These are the individual product details");
    console.log(palletId);
    console.log(itemId);
    console.log(itemId);
    console.log(lot);
    console.log(bbe);
    console.log(batch);
  // return (
  //   <>
  //     <form onSubmit={onSubmit}>
  //       <label>
  //         <input type="hidden" value={palletId} />
  //       </label>
  //       <label>
  //         Product ID
  //         <br />
  //         <input
  //           type="text"
  //           value={productId}
  //           onChange={(e) => setProductId(e.target.value)}
  //         />
  //       a</label>
  //       <br />
  //       <label>
  //         Lot
  //         <br />
  //         <input
  //           type="text"
  //           value={lot}
  //           onChange={(e) => setLot(e.target.value)}
  //         />
  //       </label>
  //       <br />
  //       <label>
  //         BBE
  //         <br />
  //         <input
  //           type="text"
  //           value={bbe}
  //           onChange={(e) => setBbe(e.target.value)}
  //         />
  //       </label>
  //       <br />
  //       <label>
  //         Batch
  //         <br />
  //         <input
  //           type="text"
  //           value={batch}
  //           onChange={(e) => setBatch(e.target.value)}
  //         />
  //       </label>
  //       <br />
  //       <label>
  //         Quantity
  //         <br />
  //         <input
  //           type="number"
  //           value={quantity}
  //           onChange={(e) => setQuantity(e.target.value)}
  //         />
  //       </label>
  //       <button type="submit">Submit</button>
  //     </form>
  //   </>
  
  // return (
  //   <div>
  //   {itemId}
  //   </div>
  // );
}
