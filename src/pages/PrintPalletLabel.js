import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

export default function PrintLabeLButton(id) {

const pallet_id = id["id"];
// console.log(pallet_id);

const printPalletLabel = (pallet_id) => {
  console.log("The Pallet id to be printed");
  console.log(pallet_id);
  };

  return (
    <div className="wrapper">
          <Button 
                  variant="contained"
                  size="small"
                  color="secondary"
    >
    PRINT LABEL
      </Button>
    </div>
  );

}
