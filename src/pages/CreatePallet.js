import React, { useEffect, useState } from "react";

export default function CreateNewPallet() {
  const [palletId, setPalletID] = useState("");

  function createPallet() {
    console.log("Created the pallet")
      .then((res) => res.json())
      .then(
        (result) => {
          setPalletID(result);
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
