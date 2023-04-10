import React, { useEffect, useState } from "react";

export default function PrintLabeLButton(id) {

const pallet_id = id["id"];
// console.log(pallet_id);

const printPalletLabel = (pallet_id) => {
  console.log("The Pallet id to be printed");
  console.log(pallet_id);
  };

  return (
    <div className="wrapper">
          <button>
    Press Me
      </button>
    </div>
  );

}
