import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button, Grid, TextField, Box, Typography, Alert, CircularProgress } from '@mui/material';
import _ from 'lodash';

export default function PalletItem({ product = {}, onSave, submitLoading }) {
  const [itemId, setItemId] = useState(product?.item_id || "");
  const [productCode, setProductCode] = useState(product?.pallet_item_product_id || "");
  const [productDescription, setProductDescription] = useState(product?.pallet_item_product_id || "");
  const [bbe, setBbe] = useState(product?.bbe || "");
  const [lot, setLot] = useState(product?.lot || "");
  const [batch, setBatch] = useState(product?.batch || "");
  const [quantity, setQuantity] = useState(product?.quantity || "");
  const [submitError, setSubmitError] = useState(null);
  const [isDirty, setIsDirty] = useState(false); // Tracks if there are unsaved changes

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
        setSubmitError(null);
        setIsDirty(false); // Reset the dirty flag after successful save
      } catch (error) {
        setSubmitError(error.message);
      }
    }, 500),
    [onSave]
  );

  useEffect(() => {
    const itemData = {
      item_id: product?.item_id,
      pallet_item_pallet_id: product?.pallet_item_pallet_id,
      pallet_item_product_id: product?.pallet_item_product_id,
      quantity,
      product_description: productDescription,
      bbe,
      lot,
      batch,
    };

    if (
      quantity !== prevValues.current.quantity ||
      productDescription !== prevValues.current.productDescription ||
      bbe !== prevValues.current.bbe ||
      lot !== prevValues.current.lot ||
      batch !== prevValues.current.batch
    ) {
      prevValues.current = { quantity, productDescription, bbe, lot, batch };
      setIsDirty(true); // Mark the form as dirty (unsaved changes)
      debouncedSavePalletItem(itemData);
    }

    return () => {
      debouncedSavePalletItem.cancel(); // Clean up the debounce on unmount
    };
  }, [quantity, productDescription, bbe, lot, batch, debouncedSavePalletItem, product]);

  const handleFieldChange = useCallback((setter) => (event) => {
    const value = event.target.value;
    setter(value);
    setIsDirty(true); // Mark the form as dirty (unsaved changes)
  }, []);

  const handleSave = () => {
    const itemData = {
      item_id: product?.item_id,
      pallet_item_pallet_id: product?.pallet_item_pallet_id,
      pallet_item_product_id: product?.pallet_item_product_id,
      quantity,
      product_description: productDescription,
      bbe,
      lot,
      batch,
    };

    try {
      onSave(itemData);
      setIsDirty(false); // Reset the dirty flag after saving
      setSubmitError(null);
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  const isQuantityValid = quantity && !isNaN(quantity) && Number(quantity) > 0;

  return (
    <Box sx={{ justifyContent: 'center', alignItems: 'center', mb: 3, p: 3, borderRadius: 2, boxShadow: 2, backgroundColor: '#f9f9f9' }}>
      <Typography variant="h5" sx={{ justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', mb: 3 }}>
        {productDescription || 'New Product'}
      </Typography>
      <Grid container spacing={2}>
        <Grid item sm={6} md={2}>
          <TextField
            fullWidth
            type="text"
            label="Product ID"
            value={productCode}
            onChange={handleFieldChange(setProductCode)}
            variant="outlined"
            sx={{ backgroundColor: '#fff', borderRadius: 1 }}
          />
        </Grid>
        <Grid item sm={6} md={2}>
          <TextField
            fullWidth
            label="Lot Number"
            value={lot}
            onChange={handleFieldChange(setLot)}
            variant="outlined"
            sx={{ backgroundColor: '#fff', borderRadius: 1 }}
          />
        </Grid>
        <Grid item sm={6} md={2}>
          <TextField
            fullWidth
            label="BBE (Best Before End)"
            type="text"
            value={bbe}
            onChange={handleFieldChange(setBbe)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            sx={{ backgroundColor: '#fff', borderRadius: 1 }}
          />
        </Grid>
        <Grid item sm={6} md={2}>
          <TextField
            fullWidth
            label="Batch Number"
            value={batch}
            onChange={handleFieldChange(setBatch)}
            variant="outlined"
            sx={{ backgroundColor: '#fff', borderRadius: 1 }}
          />
        </Grid>
        <Grid item sm={6} md={2}>
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={quantity}
            onChange={handleFieldChange(setQuantity)}
            error={!isQuantityValid}
            helperText={!isQuantityValid && "Please enter a valid quantity"}
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
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={!isDirty || !isQuantityValid || submitLoading}
            >
              {submitLoading ? <CircularProgress size={24} /> : "Save"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
