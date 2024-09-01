import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import PalletItem from '../../../components/pallets/singlePalletDetails/SinglePalletItem';
import CreateNewPalletItem from '../../../components/pallets/buttons/CreateNewPalletItemButton';

export default function SinglePalletItemsList({ palletId, palletItems, reloadPalletItems }) {

  const handleSavePalletItem = async (itemData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL3}/pallet_item/${itemData.item_id}`, {
        method: 'PUT',  // or 'POST' if it's a new item
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });

      if (!response.ok) {
        throw new Error('Failed to save pallet item');
      }

      const updatedItem = await response.json();
      reloadPalletItems((prevItems) =>
        prevItems.map(item => item.item_id === updatedItem.item_id ? updatedItem : item)
      );
    } catch (error) {
      console.error('Error saving pallet item:', error);
    }
    console.log(itemData);
    reloadPalletItems();
  };

  const handleDeletePalletItem = async (item_id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL3}/pallet_item/${item_id}`, {
        method: 'DELETE',  // or 'POST' if it's a new item
      });
      if (!response.ok) {
        throw new Error('Failed to delete pallet item');
      }
      const updatedItem = await response.json();
      reloadPalletItems((prevItems) =>
        prevItems.map(item => item.item_id === updatedItem.item_id ? updatedItem : item)
      );
    } catch (error) {
      console.error('Error saving pallet item:', error);
    }
    console.log(item_id);
    reloadPalletItems();
  };

  return (
    <Box sx={{ marginTop: 5, marginBottom: 3, padding: 2 }}>
      <hr />
      <br />
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
        <CreateNewPalletItem palletId={palletId} reload={reloadPalletItems} />
      </Grid>
    </Box>
  );
}
