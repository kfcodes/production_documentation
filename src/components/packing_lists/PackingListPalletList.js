import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import PalletPackingListCard from "./PalletPackingListCard"; // Import the existing card component

// PackingListPalletList Component
const PackingListPalletList = ({ packingListId }) => {
  const [pallets, setPallets] = useState([]);
  const [palletItems, setPalletItems] = useState([]);
  const [packingLists, setPackingLists] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data once on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch pallets, pallet items, and packing lists data
        const palletsResponse = await fetch(`${process.env.REACT_APP_API_URL2}/new_pallets/`);
        const palletItemsResponse = await fetch(`${process.env.REACT_APP_API_URL2}/new_pallet_items/`);
        const packingListsResponse = await fetch(`${process.env.REACT_APP_API_URL3}/open_packing_lists/`);

        const palletsData = await palletsResponse.json();
        const palletItemsData = await palletItemsResponse.json();
        const packingListsData = await packingListsResponse.json();

        setPallets(palletsData);
        setPalletItems(palletItemsData);
        setPackingLists(Object.values(packingListsData));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePackingListSelection = (palletId, packingListId) => {
    console.log(`Pallet ID: ${palletId} assigned to packing list: ${packingListId}`);
    // Handle the logic for packing list selection here
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "16px", minHeight: "60vh" }}>
      <Typography variant="h5" align="center" sx={{ marginBottom: 4 }}>
        Pallets Not On Any Packing List
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {pallets.map((pallet) => (
          <Grid item xs={12} md={6} key={pallet.pallet_id}>
            {/* Pass the required props to the PalletPackingListCard component */}
            <PalletPackingListCard
              pallet={pallet}
              palletItems={palletItems}
              packingLists={packingLists}
              handlePackingListSelection={handlePackingListSelection}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PackingListPalletList;
