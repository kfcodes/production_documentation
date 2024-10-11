import React, { useEffect, useState, useCallback } from "react";
import { Box, Container, Typography, CircularProgress, Alert } from "@mui/material";
import PalletPackingListCard from "./PackingListPalletCard"; // Child component

function PalletList() {
  const [pallets, setPallets] = useState([]);
  const [palletItems, setPalletItems] = useState([]);
  const [packingLists, setPackingLists] = useState([]); // Packing list names
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data for pallets, pallet items, and packing list names
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [palletsResponse, palletItemsResponse, packingListsResponse] = await Promise.all([
        fetch(`${process.env.REACT_APP_API_URL2}/new_pallets/`),
        fetch(`${process.env.REACT_APP_API_URL2}/new_pallet_items/`),
        fetch(`${process.env.REACT_APP_API_URL3}/open_packing_list_names/`), // Packing list names
      ]);

      if (!palletsResponse.ok || !palletItemsResponse.ok || !packingListsResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const palletsData = await palletsResponse.json();
      const palletItemsData = await palletItemsResponse.json();
      const packingListsData = await packingListsResponse.json();

      setPallets(palletsData);
      setPalletItems(palletItemsData);
      setPackingLists(packingListsData); // Store the packing list names
    } catch (err) {
      setError("Error fetching data. Please try again later.");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter items belonging to the current pallet
  const getFilteredItemsForPallet = (palletId) => {
    return palletItems.filter((item) => item.pallet_item_pallet_id === palletId);
  };

  // Callback to remove pallet from the list after successful packing list update
  const handlePackingListUpdate = (palletId) => {
    setPallets((prevPallets) => prevPallets.filter((pallet) => pallet.pallet_id !== palletId));
  };

  // Loading state: show spinner if data is loading
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

  // Error state: show error message if there's an error
  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Alert severity="error">{error}</Alert>
        <Typography variant="h6" align="center" gutterBottom>
          Something went wrong. Please try again later.
        </Typography>
      </Box>
    );
  }

  // Main rendering: display pallets and pass props to PalletPackingListCard
  return (
    <Container
      sx={{
        minHeight: "80vh",
        padding: "16px 16px",
        backgroundColor: "#f0f4f8",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Not on Packing List
      </Typography>
      <Box
        sx={{
          display: "flex",
          borderBottom: "2",
          flexDirection: "column",
          flexGrow: 1,
          overflowY: "auto",
          marginTop: 0,
        }}
      >
        {pallets.map((pallet) => (
          <PalletPackingListCard
            key={pallet.pallet_id}
            pallet={pallet} // Pass pallet data (including assigned packing list)
            palletItems={getFilteredItemsForPallet(pallet.pallet_id)} // Pass filtered items
            packingLists={packingLists} // Pass available packing list names
            onPackingListUpdate={handlePackingListUpdate} // Callback to remove pallet on successful update
          />
        ))}
      </Box>
    </Container>
  );
}

export default PalletList;
