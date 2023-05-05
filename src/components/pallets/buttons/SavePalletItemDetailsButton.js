import { useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import DeletePalletItem from "./DeletePalletItemButton";
import CreateNewPalletItem from "./CreateNewPalletItemButton";

export default function SavePalletDetails(pallet, item, state) {
  const palletId = pallet["pallet"];
  const item_id = pallet["item"];
  const updateState = pallet["state"];


  const saveData = (event) => {
    event.preventDefault();
    let palletItemData = {
      pallet_item_pallet_id: palletId[0],
      item_id: event.target.item_id.value,
      pallet_item_product_id: event.target.product_id.value,
      quantity: event.target.quantity.value,
      lot: event.target.lot.value,
      bbe: event.target.bbe.value,
      batch: event.target.batch.value,
    };
    console.log(palletItemData);
    fetch(
      `${process.env.REACT_APP_API_URL}/pallet_item/${palletItemData.item_id}`,
      {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(palletItemData),
      }
    ).then((result) => {
      updateState(result);
    });
  };

  return (
          <>
            <Container>
                      <Grid xs={4}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="secondary"
                          size="large"
                          sx={{ marginLeft: "auto" }}
              onClick={() => {
                saveData(item_id);
              }}
                        >
                          SAVE Data
                        </Button>
                      </Grid>
            </Container>
    </>
  );
}
