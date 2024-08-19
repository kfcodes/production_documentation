import React from "react";
import { Card, CardContent, Grid, TextField, Button } from "@mui/material";
import DeletePalletItem from "../buttons/DeletePalletItemButton";

export default function PalletItem({
  product,
  item_id,
  pallet_item_product_id,
  product_description,
  quantity,
  lot,
  bbe,
  batch,
  setPallet_item_product_id,
  setQuantity,
  setLot,
  setBbe,
  setBatch,
  onSubmit,
  setNewPalletItemsFunction,
}) {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <TextField
                fullWidth
                disabled
                label="Product Description"
                value={product_description || ""}
                InputProps={{ style: { textAlign: "center" } }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Product ID"
                value={pallet_item_product_id || ""}
                onChange={(e) => setPallet_item_product_id(e.target.value)}
                InputProps={{ style: { textAlign: "center" } }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                value={quantity || ""}
                onChange={(e) => setQuantity(e.target.value)}
                InputProps={{ style: { textAlign: "center" } }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Lot"
                value={lot || ""}
                onChange={(e) => setLot(e.target.value)}
                InputProps={{ style: { textAlign: "center" } }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="BBE"
                value={bbe || ""}
                onChange={(e) => setBbe(e.target.value)}
                InputProps={{ style: { textAlign: "center" } }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Batch"
                value={batch || ""}
                onChange={(e) => setBatch(e.target.value)}
                InputProps={{ style: { textAlign: "center" } }}
              />
            </Grid>
            <Grid item xs={1}>
              <DeletePalletItem
                id={item_id}
                state={setNewPalletItemsFunction}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "right" }}>
              <Button type="submit" variant="contained" color="secondary">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}
