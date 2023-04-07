import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';

export default function CreateNewPallet() {
  const [palletId, setPalletID] = useState("");

  function createPallet1() {
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
      <Button 
    variant="contained"
                  size="large"
                  color="success"
    onClick={createPallet1}
    >Create New Pallet
    </Button>
    </>
  );
}
