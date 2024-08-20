import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";

export default function PalletItem({
  product,
  onSave,
  submitLoading,
  submitError,
}) {
  const [quantity, setQuantity] = useState(product.quantity || "");
  const [productDescription, setProductDescription] = useState(
    product.product_description || "",
  );
  const [product, setProduct] = useState(product.pallet_item_product_id || "");
  const [bbe, setBbe] = useState(product.bbe || "");
  const [lot, setLot] = useState(product.lot || "");
  const [batch, setBatch] = useState(product.batch || "");

  const handleSave = () => {
    const itemData = {
      item_id: product.item_id,
      pallet_item_pallet_id: product.pallet_item_pallet_id,
      pallet_item_product_id: product.pallet_item_product_id,
      quantity: quantity,
      product_description: productDescription,
      bbe: bbe,
      lot: lot,
      batch: batch,
    };
    onSave(itemData);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Product"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="BBE (Best Before End)"
          type="date"
          value={bbe}
          onChange={(e) => setBbe(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Lot Number"
          value={lot}
          onChange={(e) => setLot(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Batch Number"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={submitLoading}
        >
          Save
        </Button>
      </Grid>
      {submitError && (
        <Grid item xs={12}>
          <div>Error saving item: {submitError}</div>
        </Grid>
      )}
    </Grid>
  );
}
