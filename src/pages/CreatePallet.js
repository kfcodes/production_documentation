import React, { useEffect, useState } from "react";

export default function CreateNewPallet() {
  const [palletId, setPalletID] = useState("");

  function createPallet() {
    fetch(`${process.env.REACT_APP_API_URL}/pallet`, {
      method: "post",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setPalletID(result["LAST_INSERT_ID()"]);
        }
      );
  }

  return (
    <>
    <button>
    Create New Pallet
    </button>
    </>
  );
}
