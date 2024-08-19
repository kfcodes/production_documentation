import React, { useState, useEffect } from "react";
import { Card, CardContent, Grid, TextField, Button } from "@mui/material";
import DeletePalletItem from "../buttons/DeletePalletItemButton";

export default function SinglePalletItem({
  product,
  item_id,
  setNewPalletItemsFunction,
}) {
  const [palletItemId, setPalletItemId] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [lot, setLot] = useState("");
  const [bbe, setBbe] = useState("");
  const [batch, setBatch] = useState("");

  useEffect(() => {
    if (product) {
      setPalletItemId(product.item_id);
      setProductDescription(product.product_description);
      setQuantity(product.quantity);
      setLot(product.lot);
      setBbe(product.bbe);
      setBatch(product.batch);
    }
  }, [product]);

  const onSubmit = (event) => {
    event.preventDefault();

    const palletItemData = {
      item_id: palletItemId,
      pallet_item_product_id: product.pallet_item_product_id,
      quantity,
      lot,
      bbe,
      batch,
    };

    fetch(`${process.env.REACT_APP_API_URL3}/pallet_item/${palletItemId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(palletItemData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Pallet item updated:", data);
        setNewPalletItemsFunction(data); // Update the pallet items list in the parent component
      })
      .catch((error) => console.error("Error updating pallet item:", error));
  };

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
                value={productDescription || ""}
                InputProps={{ style: { textAlign: "center" } }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Product ID"
                value={product.pallet_item_product_id || ""}
                InputProps={{ style: { textAlign: "center" } }}
                disabled
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
