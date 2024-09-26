import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import PalletPackingListCard from "./PalletPackingListCard"; // Import the existing card component

// PackingListPalletList Component
const PackingListPalletList = () => {
  const { packingListId } = useParams();
  const [pallets, setPallets] = useState([]);
  const [palletItems, setPalletItems] = useState([]);
  const [packingLists, setPackingLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error state

  // Fetch data once on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch pallets, pallet items, and packing lists data
        const palletsResponse = await fetch(
          `${process.env.REACT_APP_API_URL2}/packing_list_pallets/${packingListId}`,
        );
        const palletItemsResponse = await fetch(
          `${process.env.REACT_APP_API_URL2}/packing_list_pallet_items/${packingListId}`,
        );
        const packingListsResponse = await fetch(
          `${process.env.REACT_APP_API_URL3}/open_packing_lists/`,
        );

        if (
          !palletsResponse.ok ||
          !palletItemsResponse.ok ||
          !packingListsResponse.ok
        ) {
          throw new Error("Error fetching data");
        }

        const palletsData = await palletsResponse.json();
        const palletItemsData = await palletItemsResponse.json();
        const packingListsData = await packingListsResponse.json();

        setPallets(palletsData);
        setPalletItems(palletItemsData);
        setPackingLists(Object.values(packingListsData));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message); // Set error message if fetching fails
        setLoading(false);
      }
    };

    fetchData();
  }, [packingListId]);

  const handlePackingListSelection = (palletId, packingListId) => {
    console.log(
      `Pallet ID: ${palletId} assigned to packing list: ${packingListId}`,
    );
    // Handle the logic for packing list selection here
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        Error: {error}
      </Typography>
    );
  }

  if (pallets.length === 0) {
    return (
      <Typography variant="h6" align="center">
        No pallets found for this packing list.
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: "16px", minHeight: "60vh" }}>
      <Grid container spacing={2} justifyContent="center">
        {pallets.map((pallet) => (
          <Grid item xs={12} md={6} key={pallet.pallet_id}>
            {/* Pass the required props to the PalletPackingListCard component */}
            <PalletPackingListCard
              pallet={pallet}
              palletItems={palletItems.filter(
                (item) => item.pallet_id === pallet.pallet_id,
              )} // Filter items for each pallet
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
