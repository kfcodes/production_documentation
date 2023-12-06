import React from "react";
import Button from "@mui/material/Button";

export default function PrintLabeLButton(id) {
  const pallet_id = id["id"];

  const printPalletLabel = (pallet_id) => {
    fetch(`${process.env.REACT_APP_API_URL2}/label/${pallet_id}`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="wrapper">
      <Button
        variant="contained"
        size="small"
        color="secondary"
        onClick={() => {
          printPalletLabel(pallet_id);
        }}
      >
        PRINT PALLET LABEL
      </Button>
    </div>
  );
}
