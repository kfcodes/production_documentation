import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

export default function PrintLabeLButton(id) {

const pallet_id = id["id"];
// console.log(pallet_id);

const printPalletLabel = (pallet_id) => {
  console.log("The Pallet id to be printed");
  console.log(pallet_id);
    fetch(`${process.env.REACT_APP_API_URL}/label/${pallet_id}`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
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
        printPalletLabel(pallet_id)
  }}
    >
    PRINT LABEL
      </Button>
    </div>
  );

}
