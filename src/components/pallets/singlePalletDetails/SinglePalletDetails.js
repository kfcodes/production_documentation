import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
  Typography,
  Box,
} from "@mui/material";
import _ from "lodash";

export default function SinglePalletDetails({
  pallet_id,
  palletType,
  emptyweight,
  weight,
  height,
  onSavePalletData,
}) {
  const [localState, setLocalState] = useState({
    palletType,
    emptyweight,
    weight,
    height,
  });

  const [isDirty, setIsDirty] = useState(false); // Tracks if there are unsaved changes
  const [submitError, setSubmitError] = useState(null);

  const prevValues = useRef(localState);

  // Debounced save function
  const debouncedSavePalletData = useCallback(
    _.debounce((data) => {
      try {
        onSavePalletData(data);
        setSubmitError(null);
        setIsDirty(false); // Reset the dirty flag after successful save
      } catch (error) {
        setSubmitError("Error saving data");
      }
    }, 1000), // Adjust debounce time as needed
    [onSavePalletData]
  );

  useEffect(() => {
    if (
      localState.palletType !== prevValues.current.palletType ||
      localState.emptyweight !== prevValues.current.emptyweight ||
      localState.weight !== prevValues.current.weight ||
      localState.height !== prevValues.current.height
    ) {
      prevValues.current = localState;
      setIsDirty(true); // Mark the form as dirty (unsaved changes)
      debouncedSavePalletData(localState);
    }

    return () => {
      debouncedSavePalletData.cancel(); // Clean up the debounce on unmount
    };
  }, [localState, debouncedSavePalletData]);

  const handleFieldChange = (fieldName, value) => {
    setLocalState((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
    setIsDirty(true);
  };

  return (
    <Box
      sx={{
        mb: 3,
        p: 3,
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: isDirty ? "#ffebee" : "#f9f9f9", // Red background when isDirty is true
      }}
    >
      <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
        {pallet_id}
      </Typography>
      <Grid container spacing={3} sx={{ marginBottom: 3 }}>
        <Grid item xs={6} sm={3}>
          <TextField
            select
            fullWidth
            label="Pallet Size"
            value={localState.palletType}
            onChange={(e) => handleFieldChange("palletType", e.target.value)}
            onBlur={() => debouncedSavePalletData(localState)}
            variant="outlined"
            sx={{ backgroundColor: "#fff", borderRadius: 1 }}
          >
            <MenuItem value={1}>Standard Big Pallet</MenuItem>
            <MenuItem value={2}>Small Pallet</MenuItem>
            <MenuItem value={3}>Euro Pallet</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            fullWidth
            label="Height"
            type="number"
            value={localState.height}
            onChange={(e) => handleFieldChange("height", e.target.value)}
            onBlur={() => debouncedSavePalletData(localState)}
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
            variant="outlined"
            sx={{ backgroundColor: "#fff", borderRadius: 1 }}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            fullWidth
            label="Empty Weight"
            type="number"
            value={localState.emptyweight}
            onChange={(e) => handleFieldChange("emptyweight", e.target.value)}
            onBlur={() => debouncedSavePalletData(localState)}
            InputProps={{
              endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
            }}
            variant="outlined"
            sx={{ backgroundColor: "#fff", borderRadius: 1 }}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            fullWidth
            label="Full Weight"
            type="number"
            value={localState.weight}
            onChange={(e) => handleFieldChange("weight", e.target.value)}
            onBlur={() => debouncedSavePalletData(localState)}
            InputProps={{
              endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
            }}
            variant="outlined"
            sx={{ backgroundColor: "#fff", borderRadius: 1 }}
          />
        </Grid>
      </Grid>
      {submitError && (
        <Typography variant="body2" color="error" align="center">
          {submitError}
        </Typography>
      )}
    </Box>
  );
}
