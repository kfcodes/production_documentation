import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
  Typography,
  Divider,
} from '@mui/material';

export default function SinglePalletDetails({
  pallet_id,
  palletType,
  emptyweight,
  weight,
  height,
  onSavePalletData,
}) {
  const [localState, setLocalState] = React.useState({
    palletType,
    emptyweight,
    weight,
    height,
  });

  const handleFieldChange = (fieldName, value) => {
    setLocalState((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleBlur = () => {
    onSavePalletData(localState);
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: 3, padding: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h2" align="center" fontWeight="bold" gutterBottom>
          {pallet_id}
        </Typography>
        <Grid container spacing={3} sx={{ marginBottom: 3 }}>
          <Grid item xs={6} sm={3}>
            <TextField
              select
              fullWidth
              label="Pallet Size"
              value={localState.palletType}
              onChange={(e) => handleFieldChange('palletType', e.target.value)}
              onBlur={handleBlur}
              variant="outlined"
              sx={{ backgroundColor: '#f9f9f9', borderRadius: 1 }}
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
              onChange={(e) => handleFieldChange('height', e.target.value)}
              onBlur={handleBlur}
              InputProps={{
                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
              }}
              variant="outlined"
              sx={{ backgroundColor: '#f9f9f9', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              label="Empty Weight"
              type="number"
              value={localState.emptyweight}
              onChange={(e) => handleFieldChange('emptyweight', e.target.value)}
              onBlur={handleBlur}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
              variant="outlined"
              sx={{ backgroundColor: '#f9f9f9', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              label="Full Weight"
              type="number"
              value={localState.weight}
              onChange={(e) => handleFieldChange('weight', e.target.value)}
              onBlur={handleBlur}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
              variant="outlined"
              sx={{ backgroundColor: '#f9f9f9', borderRadius: 1 }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

