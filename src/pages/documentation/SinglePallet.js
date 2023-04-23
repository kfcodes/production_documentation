import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SinglePallet() {
  let { palletid } = useParams();
  console.log(palletid);

  return (
    <div className="wrapper">
      <h2> Pallet Details </h2>
    </div>
  );
}

export default SinglePallet;
