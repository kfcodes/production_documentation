import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  Button,
  Typography,
  Divider,
  Box,
  Alert,
} from '@mui/material';
import PrintLabeLButton from '../buttons/PrintPalletLabelButton';
import _ from 'lodash';

export default function SinglePalletDetails({
  pallet_id,
  palletType,
  emptyweight,
  weight,
  height,
  setPalletType,
  setEmptyweight,
  setWeight,
  setHeight,
  onSavePalletData,
}) {
  const [submitError, setSubmitError] = useState(null);

  // Store previous values to compare with the current ones
  const prevValues = useRef({
    palletType,
    emptyweight,
    weight,
    height,
  });

  // Debounced save function
  const debouncedSavePalletData = useCallback(
    _.debounce((palletData) => {
      try {
        onSavePalletData(palletData);
      } catch (error) {
        setSubmitError(error.message);
      }
    }, 500),
    [] // Empty dependency array ensures that the debounce function is created only once
  );

  useEffect(() => {
    // Check if any of the values have actually changed
    if (
      palletType !== prevValues.current.palletType ||
      emptyweight !== prevValues.current.emptyweight ||
      weight !== prevValues.current.weight ||
      height !== prevValues.current.height
    ) {
      const palletData = {
        pallet_id,
        pallet_type: palletType,
        empty_weight: emptyweight,
        weight,
        height,
      };

      // Update the previous values ref
      prevValues.current = { palletType, emptyweight, weight, height };

      // Trigger the debounced save function
      debouncedSavePalletData(palletData);
    }

    return () => {
      debouncedSavePalletData.cancel(); // Clean up the debounce on unmount
    };
  }, [palletType, emptyweight, weight, height, pallet_id, debouncedSavePalletData]);

  const handleSave = () => {
    const palletData = {
      pallet_id,
      pallet_type: palletType,
      empty_weight: emptyweight,
      weight,
      height,
    };

    debouncedSavePalletData(palletData); // Immediate save on button click
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: 3, padding: 2, boxShadow: 2, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
          Pallet ID: {pallet_id}
        </Typography>

        <Divider sx={{ marginBottom: 3 }} />

        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Pallet Dimensions
        </Typography>
        <Grid container spacing={3} sx={{ marginBottom: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Pallet Size"
              value={palletType}
              onChange={(e) => setPalletType(e.target.value)}
              variant="outlined"
            >
              <MenuItem value={1}>Standard Big Pallet</MenuItem>
              <MenuItem value={2}>Small Pallet</MenuItem>
              <MenuItem value={3}>Euro Pallet</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
              }}
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginBottom: 3 }} />

        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Pallet Weights
        </Typography>
        <Grid container spacing={3} sx={{ marginBottom: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Empty Weight"
              type="number"
              value={emptyweight}
              onChange={(e) => setEmptyweight(e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Full Weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginBottom: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ minWidth: 150 }}
          >
            Save
          </Button>
          {weight !== 0 && emptyweight !== 0 && height !== 0 && (
            <PrintLabeLButton id={pallet_id} />
          )}
        </Box>
        {submitError && (
          <Box sx={{ mt: 2 }}>
            <Alert severity="error">
              Error saving pallet details: {submitError}
            </Alert>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
