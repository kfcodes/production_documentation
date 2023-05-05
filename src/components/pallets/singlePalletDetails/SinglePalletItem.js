import { useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import DeletePalletItem from "../buttons/DeletePalletItemButton";

export default function PalletItem(props) {
  const product = props["product"];
  const palletId = props["palletId"];
  const setNewPalletItems = props["setNewPalletItems"];

  const onSubmit = (event) => {
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
      setNewPalletItems(result);
    });
  };

  return (
    <>
      <Container>
        <Card variant="outlined">
          <CardContent>
            <form onSubmit={onSubmit}>
              <input
                id="item_id"
                name="item_id"
                type="hidden"
                value={product.item_id}
              />
              <Grid container padding={1} spacing={1} justifyContent="center">
                {product.product_description != null && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="text"
                      disabled="true"
                      id="product_description"
                      name="product_description"
                      value={product.product_description}
                      inputProps={{ style: { textAlign: "center" } }}
                    />
                  </Grid>
                )}
              </Grid>
              <Grid container padding={1} spacing={1} justifyContent="center">
                <Grid item xs={7}>
                  <TextField
                    fullWidth
                    label="Product ID"
                    type="text"
                    id="product_id"
                    name="product_id"
                    value={product.pallet_item_product_id}
                    inputProps={{ style: { textAlign: "center" } }}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={product.quantity}
                    inputProps={{ style: { textAlign: "center" } }}
                  />
                </Grid>
              </Grid>
              <Grid container padding={1} spacing={1} justifyContent="center">
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Lot"
                    type="text"
                    id="lot"
                    name="lot"
                    value={product.lot}
                    inputProps={{ style: { textAlign: "center" } }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="BBE"
                    type="text"
                    id="bbe"
                    name="bbe"
                    value={product.bbe}
                    inputProps={{ style: { textAlign: "center" } }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Batch"
                    type="text"
                    id="batch"
                    name="batch"
                    value={product.batch}
                    inputProps={{ style: { textAlign: "center" } }}
                  />
                </Grid>
              </Grid>
              <Grid container padding={1} spacing={1} justifyContent="center">
                <DeletePalletItem
                  id={product.item_id}
                  state={setNewPalletItems}
                />
                <Grid xs={4}>
                  {" "}
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{ marginLeft: "auto" }}
                  >
                    SAVE
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
