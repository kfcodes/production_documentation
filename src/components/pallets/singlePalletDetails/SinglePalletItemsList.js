import React from 'react';
import { Grid, Typography, Box, Card, CardContent, Divider } from '@mui/material';
import PalletItem from '../../../components/pallets/singlePalletDetails/SinglePalletItem';
import CreateNewPalletItem from '../../../components/pallets/buttons/CreateNewPalletItemButton';
import DeletePalletItemButton from '../../../components/pallets/buttons/DeletePalletItemButton';


export default function SinglePalletItemsList({ palletId, palletItems, setNewPalletItemsFunction }) {

  const handleSavePalletItem = (itemData) => {
    console.log(itemData)
    // Logic to save pallet item data
    setNewPalletItemsFunction((prevItems) =>
      prevItems.map(item => item.item_id === itemData.item_id ? itemData : item)
    );
  };

  const handleDeletePalletItem = (item) => {
    console.log(item)
    DeletePalletItemButton(item)
    setNewPalletItemsFunction(item)
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
              onDelete={handleDeletePalletItem}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}>
        <CreateNewPalletItem palletId={palletId} reload={setNewPalletItemsFunction} />
      </Grid>
    </Box>
  );
}
