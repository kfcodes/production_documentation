import React, { useEffect, useState, useCallback } from "react";
import { Box, Container, Typography, CircularProgress } from "@mui/material";
import PalletPackingListCard from "./PalletPackingListCard";

function PalletList() {
  const [pallets, setPallets] = useState([]);
  const [palletItems, setPalletItems] = useState([]);
  const [packingLists, setPackingLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const palletsResponse = await fetch(
          `${process.env.REACT_APP_API_URL2}/new_pallets/`,
        );
        const palletItemsResponse = await fetch(
          `${process.env.REACT_APP_API_URL2}/new_pallet_items/`,
        );
        const openPackingLists = await fetch(
          `${process.env.REACT_APP_API_URL3}/open_packing_lists/`,
        );

        const palletsData = await palletsResponse.json();
        const palletItemsData = await palletItemsResponse.json();
        const packingListsData = await openPackingLists.json();

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

  const handlePackingListSelection = useCallback(
    async (palletId, packingListId) => {
      console.log(`Packing List ID selected: ${packingListId}`); // Print packing list ID to console
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL2}/update_pallet/${palletId}/`,
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

        if (response.ok) {
          // Remove the pallet from the list immediately after successful selection
          setPallets((prevPallets) =>
            prevPallets.filter((pallet) => pallet.pallet_id !== palletId),
          );
          console.log(
            `Pallet ID: ${palletId} assigned to packing list: ${packingListId}`,
          );
        } else {
          console.error("Error updating pallet");
        }
      } catch (error) {
        console.error("Error updating pallet:", error);
      }
    },
    [],
  );

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
            palletItems={palletItems}
            packingLists={packingLists}
            handlePackingListSelection={handlePackingListSelection}
          />
        ))}
      </Box>
    </Container>
  );
}

export default PalletList;
