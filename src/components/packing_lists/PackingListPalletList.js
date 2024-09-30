import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To extract URL parameters
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import PalletPackingListCard from "./PalletPackingListCard"; // Import the card component

// PackingListPalletList Component
const PackingListPalletList = () => {
  const { packingListId } = useParams();  // Extract packing list ID from URL
  const [pallets, setPallets] = useState([]);  // State for pallets
  const [packingLists, setPackingLists] = useState([]);  // Available packing lists
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  // Fetch data once on component mount
  useEffect(() => {
    // Check if packingListId is undefined or invalid
    if (!packingListId) {
      setError("Invalid packing list ID");
      setLoading(false); // Stop loading since there is an error
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch pallets data and available packing lists from the API
        const palletsResponse = await fetch(
          `${process.env.REACT_APP_API_URL2}/packing_list_pallets/${packingListId}`,
        );
        const packingListsResponse = await fetch(
          `${process.env.REACT_APP_API_URL3}/open_packing_lists/`,
        );

        // Check if responses are OK
        if (!palletsResponse.ok || !packingListsResponse.ok) {
          throw new Error("Error fetching data");
        }

        const palletsData = await palletsResponse.json();
        const packingListsData = await packingListsResponse.json();

        // Set the data in state
        setPallets(palletsData);  // Assuming palletsData is an array of pallet objects
        setPackingLists(Object.values(packingListsData));  // Assuming packingListsData is an object
        setLoading(false);  // Disable loading state after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);  // Set error message
        setLoading(false);  // Stop loading in case of error
      }
    };

    fetchData();  // Trigger the data fetch on mount
  }, [packingListId]);  // Re-run fetch if packingListId changes

  const handlePackingListSelection = (palletId, packingListId) => {
    console.log(`Pallet ID: ${palletId} assigned to packing list: ${packingListId}`);
    // Logic for handling the selection can be placed here (e.g., API request to update assignment)
  };

  // Show loading spinner while fetching
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

  // Show error message if there was an error
  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        Error: {error}
      </Typography>
    );
  }

  // Show message if no pallets are found
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
            {/* Render PalletPackingListCard for each pallet */}
            <PalletPackingListCard
              pallet={pallet}  // Pass the pallet data
              palletItems={pallet.items || []}  // Pass the items for the pallet
              packingLists={packingLists}  // Pass the available packing lists
              selectedPackingList={pallet.packing_list_id}  // Pass the currently selected packing list ID
              onSelectPackingList={handlePackingListSelection}  // Pass callback for selecting packing list
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PackingListPalletList;
