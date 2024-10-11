import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import PalletPackingListCard from "./PalletPackingListCard";

function PalletList() {
  const [pallets, setPallets] = useState([]);
  const [palletItems, setPalletItems] = useState([]);
  const [packingLists, setPackingLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPackingLists, setSelectedPackingLists] = useState({}); // Store selected packing lists for each pallet

  // Fetch data for pallets, pallet items, and packing lists
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [palletsResponse, palletItemsResponse, packingListsResponse] =
        await Promise.all([
          fetch(`${process.env.REACT_APP_API_URL2}/new_pallets/`),
          fetch(`${process.env.REACT_APP_API_URL2}/new_pallet_items/`),
          fetch(`${process.env.REACT_APP_API_URL3}/open_packing_list_names/`),
        ]);

      if (
        !palletsResponse.ok ||
        !palletItemsResponse.ok ||
        !packingListsResponse.ok
      ) {
        throw new Error("Failed to fetch data");
      }

      const palletsData = await palletsResponse.json();
      const palletItemsData = await palletItemsResponse.json();
      const packingListsData = await packingListsResponse.json();

      setPallets(palletsData);
      setPalletItems(palletItemsData);
      setPackingLists(packingListsData); // Store the full packing list data
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

  // Function to handle selection of packing list for a pallet
  const handlePackingListSelection = useCallback(
    async (palletId, packingListId) => {
      console.log(`Packing List ID selected: ${packingListId}`);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL2}/set_pallet_packing_list/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              pallet_id: palletId,
              packing_list_id: packingListId,
            }),
          },
        );

        if (!response.ok) {
          throw new Error("Failed to update pallet");
        }

        setSelectedPackingLists((prev) => ({
          ...prev,
          [palletId]: packingListId,
        }));

        // Update the pallet list after successful selection
        setPallets((prevPallets) =>
          prevPallets.filter((pallet) => pallet.pallet_id !== palletId),
        );
        console.log(
          `Pallet ID: ${palletId} assigned to packing list: ${packingListId}`,
        );
      } catch (err) {
        setError("Error updating pallet. Please try again.");
        console.error("Error updating pallet:", err);
      }
    },
    [],
  );

  // Filter items belonging to the current pallet
  const getFilteredItemsForPallet = (palletId) => {
    return palletItems.filter(
      (item) => item.pallet_item_pallet_id === palletId,
    );
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
            pallet={pallet}
            palletItems={getFilteredItemsForPallet(pallet.pallet_id)} // Pass filtered items
            packingLists={packingLists} // Pass full packing list data
            selectedPackingList={selectedPackingLists[pallet.pallet_id] || ""} // Pass selected packing list
            onSelectPackingList={handlePackingListSelection} // Pass the selection handler
          />
        ))}
      </Box>
    </Container>
  );
}

export default PalletList;
