import React from "react";
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
} from "@mui/material";
import PrintLabeLButton from "../buttons/PrintPalletLabelButton";

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
  return (
    <Card variant="outlined" sx={{ marginBottom: 3 }}>
      <CardContent>
        {/* Centered Pallet ID as Header */}
        <Typography
          variant="h4"
          component="div"
          align="center"
          fontWeight="bold"
          gutterBottom
        >
          {pallet_id}
        </Typography>

        <Divider sx={{ marginBottom: 3 }} />

        {/* Pronounced Subheading for Pallet Dimensions */}
        <Typography
          variant="h5"
          component="div"
          align="center"
          sx={{ fontWeight: 'bold', marginBottom: 2 }}
        >
          Pallet Dimensions
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ marginBottom: 3 }}>
          <Grid item xs={12} sm={5}>
            <Select
              fullWidth
              label="Pallet Size"
              value={palletType}
              onChange={(e) => setPalletType(e.target.value)}
              displayEmpty
            >
              <MenuItem value={1}>Standard Big Pallet</MenuItem>
              <MenuItem value={2}>Small Pallet</MenuItem>
              <MenuItem value={3}>Euro Pallet</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                style: { textAlign: "center" },
              }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginBottom: 3 }} />

        {/* Pronounced Subheading for Pallet Weights */}
        <Typography
          variant="h5"
          component="div"
          align="center"
          sx={{ fontWeight: 'bold', marginBottom: 2 }}
        >
          Pallet Weights
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ marginBottom: 3 }}>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Empty Weight"
              type="number"
              value={emptyweight}
              onChange={(e) => setEmptyweight(e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                style: { textAlign: "center" },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Full Weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                style: { textAlign: "center" },
              }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginBottom: 3 }} />

        {/* Centered Save Button and Print Label Button */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={onSavePalletData}
              fullWidth
              sx={{ maxWidth: 200 }}
            >
              Save
            </Button>
          </Grid>
          {weight !== 0 && emptyweight !== 0 && height !== 0 && (
            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <PrintLabeLButton id={pallet_id} />
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}
