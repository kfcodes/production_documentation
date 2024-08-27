import React from 'react';
import { Grid, Typography, Box, Card, CardContent, Divider } from '@mui/material';
import PalletItem from '../../../components/pallets/singlePalletDetails/SinglePalletItem';

export default function SinglePalletItemsList({ pallet_id, palletItems, setNewPalletItemsFunction }) {

  const handleSavePalletItem = (itemData) => {
    // Logic to save pallet item data
    setNewPalletItemsFunction((prevItems) =>
      prevItems.map(item => item.item_id === itemData.item_id ? itemData : item)
    );
  };

  return (
    <Box sx={{ marginBottom: 3, padding: 2 }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Pallet Items
      </Typography>
      <Grid container spacing={2}>
        {palletItems.map((item) => (
          <Grid item xs={12} key={item.item_id}>
            <PalletItem
              product={item}
              onSave={handleSavePalletItem}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
