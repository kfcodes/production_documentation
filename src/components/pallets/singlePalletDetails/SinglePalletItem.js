import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button, Grid, TextField, Box, Typography, Alert } from '@mui/material';
import _ from 'lodash';

export default function PalletItem({ product = {}, onSave, submitLoading }) {
  const [quantity, setQuantity] = useState(product?.quantity || "");
  const [productDescription, setProductDescription] = useState(product?.product_description || "");
  const [bbe, setBbe] = useState(product?.bbe || "");
  const [lot, setLot] = useState(product?.lot || "");
  const [batch, setBatch] = useState(product?.batch || "");
  const [submitError, setSubmitError] = useState(null);

  // Store previous values to compare with the current ones
  const prevValues = useRef({
    quantity,
    productDescription,
    bbe,
    lot,
    batch,
  });

  // Debounced save function
  const debouncedSavePalletItem = useCallback(
    _.debounce((itemData) => {
      try {
        onSave(itemData);
      } catch (error) {
        setSubmitError(error.message);
      }
    }, 5500),
    [] // Empty dependency array ensures that the debounce function is created only once
  );

  useEffect(() => {
    if (
      quantity !== prevValues.current.quantity ||
      productDescription !== prevValues.current.productDescription ||
      bbe !== prevValues.current.bbe ||
      lot !== prevValues.current.lot ||
      batch !== prevValues.current.batch
    ) {
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

      prevValues.current = { quantity, productDescription, bbe, lot, batch };

      debouncedSavePalletItem(itemData);
    }

    return () => {
      debouncedSavePalletItem.cancel(); // Clean up the debounce on unmount
    };
  }, [quantity, productDescription, bbe, lot, batch, debouncedSavePalletItem]);

  return (
    <Box sx={{ mb: 3, p: 3, borderRadius: 2, boxShadow: 2, backgroundColor: '#f9f9f9' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
        {product?.product_description || 'Product Item'}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="text"
            label="Product Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            variant="outlined"
            sx={{ backgroundColor: '#fff', borderRadius: 1 }}
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
            sx={{ backgroundColor: '#fff', borderRadius: 1 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="BBE (Best Before End)"
            type="text"
            value={bbe}
            onChange={(e) => setBbe(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            sx={{ backgroundColor: '#fff', borderRadius: 1 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Lot Number"
            value={lot}
            onChange={(e) => setLot(e.target.value)}
            variant="outlined"
            sx={{ backgroundColor: '#fff', borderRadius: 1 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Batch Number"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            variant="outlined"
            sx={{ backgroundColor: '#fff', borderRadius: 1 }}
          />
        </Grid>
        {submitError && (
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
