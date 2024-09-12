// PackingListPalletList.js
import React from 'react';
import { Grid, Typography } from '@mui/material';

const PackingListPalletList = ({ packingList }) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h6" paragraph>
          Details:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" paragraph>
          This packing list contains detailed information about the items being shipped.
          It includes {packingList.big || 0} big items and {packingList.small || 0} small items,
          requiring careful handling and packing.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" paragraph>
          The shipment contains a total of {packingList.pallets || 0} pallets and weighs{" "}
          {packingList.weight || 0} kg.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PackingListPalletList;

