import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SinglePallet() {
  const [pallet, setPallet] = useState([]);
  const [pallet_1, setPallet_1] = useState([]);
  let { palletid } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/pallet/${palletid}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPallet(result);
          setPallet_1(result[0]);
          console.log(result);
          // console.log(result.map());
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

        // <p>{pallet.item_id}</p>
        // <p>{pallet.pallet_item_pallet_id}</p>
        // <p>{pallet.product_id}</p>
        // <p>{pallet.lot}</p>
        // <p>{pallet.bbe}</p>
        // <p>{pallet.batch}</p>
        // <p>{pallet.quantity}</p>
        // <p>{pallet.id}</p>
        // <p>{pallet.pallet_length}</p>
        // <p>{pallet.pallet_width}</p>
        // <p>{pallet.pallet_name}</p>
        // <p>{pallet.packing_list_id}</p>
        // <p>{pallet.packing_list_name}</p>
        // {pallet.map((pallet) => (
        // {pallet[0]((pallet) => (
        // )
// )}
  //
  //
  //
  //
  // 
  return (
    <div className="wrapper">
      <h2> Pallet Details </h2>
          <p>Pallet Number: {pallet_1.pallet_id}</p>
    </div>
  );
}

export default SinglePallet;
