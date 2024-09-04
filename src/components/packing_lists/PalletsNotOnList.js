import React, { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress, Card, CardContent, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

// Component to display a list of pallets not on any packing list
const PalletsNotOnList = () => {
  const [pallets, setPallets] = useState([]);
  const [packingLists, setPackingLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of open packing lists
    const fetchPackingLists = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL3}/open_packing_lists/`);
        const data = await response.json();
        setPackingLists(Object.values(data)); // Convert the object to an array
      } catch (error) {
        console.error('Error fetching packing lists:', error);
      }
    };

    // Fetch the list of pallets not on any packing list
    const fetchPallets = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL3}/pallets_not_on_list/`);
        const data = await response.json();
        setPallets(Object.values(data)); // Convert the object to an array
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pallets:', error);
        setLoading(false);
      }
    };

    fetchPackingLists();
    fetchPallets();
  }, []);

  const handlePackingListSelection = async (palletId, packingListId) => {
    try {
      // Update the pallet with the selected packing list
      const response = await fetch(`${process.env.REACT_APP_API_URL3}/update_pallet/${palletId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ packing_list_id: packingListId }),
      });

      if (response.ok) {
        // If successful, remove the pallet from the list
        setPallets(pallets.filter(pallet => pallet.pallet_id !== palletId));
      } else {
        console.error('Error updating pallet');
      }
    } catch (error) {
      console.error('Error updating pallet:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container sx={{ padding: '32px 16px', backgroundColor: '#f9f9f9', borderRadius: '16px' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Pallets Not On Any Packing List
      </Typography>
      <Grid container spacing={4}>
        {pallets.length === 0 ? (
          <Typography variant="h6" component="p" align="center">
            All pallets have been assigned to a packing list.
          </Typography>
        ) : (
          pallets.map((pallet) => (
            <Grid item xs={12} sm={6} md={4} key={pallet.pallet_id}>
              <Card sx={{ backgroundColor: '#e0f7fa', padding: '16px', borderRadius: '12px' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Pallet ID: {pallet.pallet_id}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Weight: {pallet.weight}kg
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Destination: {pallet.destination}
                  </Typography>

                  {/* Dropdown to select the packing list */}
                  <FormControl fullWidth sx={{ marginTop: '16px' }}>
                    <InputLabel id={`packing-list-select-label-${pallet.pallet_id}`}>Select Packing List</InputLabel>
                    <Select
                      labelId={`packing-list-select-label-${pallet.pallet_id}`}
                      id={`packing-list-select-${pallet.pallet_id}`}
                      label="Select Packing List"
                      onChange={(e) => handlePackingListSelection(pallet.pallet_id, e.target.value)}
                    >
                      {packingLists.map((list) => (
                        <MenuItem key={list.packing_list_id} value={list.packing_list_id}>
                          {list.packing_list_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default PalletsNotOnList;

