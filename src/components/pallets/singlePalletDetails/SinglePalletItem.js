import React, { useState, useEffect, useCallback, useRef } from "react"; import {
  Grid,
  TextField,
  Box,
  Typography,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import _ from "lodash";

export default function PalletItem({
  product = {},
  onSave,
  onDelete,
  submitLoading,
}) {
  const [productCode, setProductCode] = useState(product?.pallet_item_product_id || "");
  const [productDescription, setProductDescription] = useState(product?.product_description || "NOT SAVED!!");
  const [bbe, setBbe] = useState(product?.bbe || "");
  const [lot, setLot] = useState(product?.lot || "");
  const [batch, setBatch] = useState(product?.batch || "");
  const [quantity, setQuantity] = useState(product?.quantity || "");
  const [submitError, setSubmitError] = useState(null);
  const [isDirty, setIsDirty] = useState(false); // Tracks if there are unsaved changes
  const [open, setOpen] = useState(false); // Modal open state
  const holdTimeout = useRef(null); // Ref to track the hold timeout

  // Reset productDescription on every render
  useEffect(() => {
    setProductDescription(product?.product_description || "NOT SAVED!!");
  }, [product?.product_description]);

  // Store previous values to compare with the current ones
  const prevValues = useRef({
    quantity,
    productCode,
    bbe,
    lot,
    batch,
  });

  // Debounced save function
  const debouncedSavePalletItem = useCallback(
    _.debounce(async (itemData) => {
      try {
        const updatedItem = await onSave(itemData);
        setSubmitError(null);
        setIsDirty(false); // Reset the dirty flag after successful save

        // Update productDescription if returned by the API
        if (updatedItem && updatedItem.product_description) {
          setProductDescription(updatedItem.product_description);
        }
      } catch (error) {
        setSubmitError(error.message);
      }
    }, 2000),
    [onSave]
  );

  useEffect(() => {
    const itemData = {
      item_id: product?.item_id,
      pallet_item_pallet_id: product?.pallet_item_pallet_id,
      pallet_item_product_id: productCode, // Include productCode
      quantity,
      product_description: productDescription,
      bbe,
      lot,
      batch,
    };

    if (
      quantity !== prevValues.current.quantity ||
      productCode !== prevValues.current.productCode ||
      bbe !== prevValues.current.bbe ||
      lot !== prevValues.current.lot ||
      batch !== prevValues.current.batch
    ) {
      prevValues.current = { quantity, productCode, bbe, lot, batch };
      setIsDirty(true); // Mark the form as dirty (unsaved changes)
      debouncedSavePalletItem(itemData);
    }

    return () => {
      debouncedSavePalletItem.cancel(); // Clean up the debounce on unmount
    };
  }, [
    quantity,
    productCode, // Include productCode as a dependency
    productDescription,
    bbe,
    lot,
    batch,
    debouncedSavePalletItem,
    product,
  ]);

  const handleFieldChange = useCallback(
    (setter) => (event) => {
      const value = event.target.value;
      setter(value);
      setIsDirty(true); // Mark the form as dirty (unsaved changes)
    },
    []
  );

  const isQuantityValid = quantity && !isNaN(quantity) && Number(quantity) > 0;

  // Handle press and hold event to open the modal
  const handleStartHold = () => {
    holdTimeout.current = setTimeout(() => {
      setOpen(true);
    }, 1000); // 1 second hold time
  };

  const handleEndHold = () => {
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
      holdTimeout.current = null;
    }
  };

  // Handle closing the modal
  const handleClose = () => {
    setOpen(false);
  };

  // Handle delete action
  const handleDelete = () => {
    onDelete(product?.item_id);
    setOpen(false);
  };

  return (
    <Box
      onMouseDown={handleStartHold}
      onMouseUp={handleEndHold}
      onMouseLeave={handleEndHold} // Handle case where mouse leaves the component
      onTouchStart={handleStartHold} // For touch devices
      onTouchEnd={handleEndHold} // For touch devices
      sx={{
        justifyContent: "center",
        alignItems: "center",
        mb: 3,
        p: 3,
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: isDirty ? "#FF1C3E" : "#F7F5B6", // Slightly darker grey background when not dirty
        borderColor: '#9C9894',
        borderStyle: 'solid',
        borderWidth: '.1px'
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          mb: 2,
        }}
      >
        {productDescription}
      </Typography>
      <Grid container spacing={2}>
        <Grid item sm={false} md={1}></Grid>
        <Grid item sm={6} md={2}>
          <TextField
            fullWidth
            type="text"
            label="Product ID"
            value={productCode}
            onChange={handleFieldChange(setProductCode)}
            variant="outlined"
            sx={{ backgroundColor: "#FFFFFF", borderRadius: 1 }} // Slightly darker grey background for input fields
          />
        </Grid>
        <Grid item sm={6} md={2}>
          <TextField
            fullWidth
            label="Lot Number"
            value={lot}
            onChange={handleFieldChange(setLot)}
            variant="outlined"
            sx={{ backgroundColor: "#FFFFFF", borderRadius: 1 }} // Slightly darker grey background for input fields
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
            sx={{ backgroundColor: "#FFFFFF", borderRadius: 1 }} // Slightly darker grey background for input fields
          />
        </Grid>
        <Grid item sm={6} md={2}>
          <TextField
            fullWidth
            label="Batch Number"
            value={batch}
            onChange={handleFieldChange(setBatch)}
            variant="outlined"
            sx={{ backgroundColor: "#FFFFFF", borderRadius: 1 }} // Slightly darker grey background for input fields
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
            sx={{ backgroundColor: "#FFFFFF", borderRadius: 1 }} // Slightly darker grey background for input fields
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

      {/* Modal for Delete Confirmation */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Pallet Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this pallet item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
