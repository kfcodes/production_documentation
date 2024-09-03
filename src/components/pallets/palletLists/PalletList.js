import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Grow from "@mui/material/Grow";
import PalletCard from "./PalletCard";

function PalletList() {
  const [pallets, setPallets] = useState([]);
  const [palletItems, setPalletItems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL2}/new_pallets/`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPallets(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL2}/new_pallet_items/`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPalletItems(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <Grid container direction="column" spacing={2} padding={2}>
      {pallets.map((pallet, index) => (
        <Grow
          in={true}
          style={{ transformOrigin: "0 0 0" }}
          {...(index ? { timeout: index * 500 } : {})}
          key={pallet.pallet_id}
        >
          <Grid item>
            <PalletCard pallet={pallet} palletItems={palletItems} />
          </Grid>
        </Grow>
      ))}
    </Grid>
  );
}

export default PalletList;
