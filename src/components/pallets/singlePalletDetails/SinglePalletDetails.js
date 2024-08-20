import React, { useState } from 'react';
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
  const [submitError, setSubmitError] = useState(null); // State for managing submission errors

  const handleSave = () => {
    try {
      const palletData = {
        pallet_id: pallet_id,
        pallet_type: palletType,
        empty_weight: emptyweight,
        weight,
        height,
      };

      onSavePalletData(palletData); // Assuming onSubmit is a function passed as a prop to save the data
    } catch (error) {
      setSubmitError(error.message); // Handle any errors and display them
    }
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: 3, padding: 2, boxShadow: 2, borderRadius: 2 }}>
      <CardContent>
        {/* Pallet ID Heading */}
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
          Pallet ID: {pallet_id}
        </Typography>

        <Divider sx={{ marginBottom: 3 }} />

        {/* Pallet Dimensions Section */}
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

        {/* Pallet Weights Section */}
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

        {/* Action Buttons */}
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
