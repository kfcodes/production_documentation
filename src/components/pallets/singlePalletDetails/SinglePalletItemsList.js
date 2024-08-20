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
      <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
        Pallet Items
      </Typography>
      <Divider sx={{ marginBottom: 3 }} />
      <Grid container spacing={3}>
        {palletItems.map((item) => (
          <Grid item xs={12} md={6} key={item.item_id}>
            <Card variant="outlined" sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardContent sx={{ padding: 3 }}>
                <PalletItem
                  product={item}
                  onSave={handleSavePalletItem}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
