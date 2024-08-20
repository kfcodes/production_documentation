import React, { useState } from 'react';
import { Button, Grid, TextField, Box, Typography, Alert } from '@mui/material';

export default function PalletItem({ product = {}, onSave, submitLoading }) {
  const [quantity, setQuantity] = useState(product?.quantity || "");
  const [productDescription, setProductDescription] = useState(product?.product_description || "");
  const [bbe, setBbe] = useState(product?.bbe || "");
  const [lot, setLot] = useState(product?.lot || "");
  const [batch, setBatch] = useState(product?.batch || "");
  const [submitError, setSubmitError] = useState(null); // Define submitError

  const handleSave = () => {
    try {
      const itemData = {
        item_id: product?.item_id,
        pallet_item_pallet_id: product?.pallet_item_pallet_id,
        pallet_item_product_id: product?.pallet_item_product_id,
        quantity: quantity,
        product_description: productDescription,
        bbe: bbe,
        lot: lot,
        batch: batch,
      };
  
      onSave(itemData);
    } catch (error) {
      setSubmitError(error.message); // Set the error message
    }
  };

  return (
    <Box sx={{ mb: 3, p: 2, border: '1px solid #ddd', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        {product?.product_description || 'Product Item'}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Product Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            variant="outlined"
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
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Lot Number"
            value={lot}
            onChange={(e) => setLot(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Batch Number"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            fullWidth
            disabled={submitLoading}
          >
            {submitLoading ? 'Saving...' : 'Save Item'}
          </Button>
        </Grid>
        {submitError && ( // Conditionally render error message
          <Grid item xs={12}>
            <Alert severity="error" sx={{ mt: 2 }}>
              Error saving item: {submitError}
            </Alert>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

