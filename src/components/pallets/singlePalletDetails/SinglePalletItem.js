import React, { useState } from 'react';
import { Button, Grid, TextField } from "@mui/material";

export default function PalletItem({ product, onSave, submitLoading, submitError }) {
  const [quantity, setQuantity] = useState(product.quantity || "");

  const handleSave = () => {
    const itemData = {
      item_id: product.item_id,
      pallet_item_pallet_id: product.pallet_item_pallet_id,
      pallet_item_product_id: product.pallet_item_product_id,
      quantity: quantity,
      // ... other item data
    };

    onSave(itemData);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button variant="contained" color="primary" onClick={handleSave} disabled={submitLoading}>
          Save
        </Button>
      </Grid>
      {submitError && <Grid item xs={12}><div>Error saving item: {submitError}</div></Grid>}
    </Grid>
  );
}
