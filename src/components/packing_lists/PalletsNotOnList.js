import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import HeightIcon from "@mui/icons-material/Height";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

// PalletList Component
function PalletList() {
  const [pallets, setPallets] = useState([]);
  const [palletItems, setPalletItems] = useState([]);
  const [packingLists, setPackingLists] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data once on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
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

  const handlePackingListSelection = useCallback(async (palletId, packingListId) => {
    console.log(`Packing List ID selected: ${packingListId}`); // Print packing list ID to console
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL2}/update_pallet/${palletId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ packing_list_id: packingListId }),
      });

      if (response.ok) {
        // Remove the pallet from the list immediately after successful selection
        setPallets((prevPallets) => prevPallets.filter((pallet) => pallet.pallet_id !== palletId));
        console.log(`Pallet ID: ${palletId} assigned to packing list: ${packingListId}`);
      } else {
        console.error("Error updating pallet");
      }
    } catch (error) {
      console.error("Error updating pallet:", error);
    }
  }, []);

  const PalletCard = ({ pallet }) => {
    const { pallet_id, pallet_type_letter, weight, height } = pallet;
    const [selectedPackingList, setSelectedPackingList] = useState("");

    const filteredItems = useMemo(() => {
      return palletItems.filter((item) => item.pallet_item_pallet_id === pallet_id);
    }, [palletItems, pallet_id]);

    const handleSelectChange = (event) => {
      const packingListId = event.target.value;
      setSelectedPackingList(packingListId);
      handlePackingListSelection(pallet_id, packingListId); // Trigger API call and local update
    };

    return (
      <Card
        sx={{
          cursor: "pointer",
          width: "100%",
          backgroundColor: "#e0f7fa", // Light teal background (original pallet color)
          "&:hover": {
            boxShadow: 8,
            backgroundColor: "#b2ebf2", // Slightly darker teal on hover
          },
          borderRadius: 3,
          transition: "0.3s", // Smooth transition for hover effect
          mb: 2, // Add some spacing between pallets
        }}
      >
        <CardContent sx={{ padding: 2 }}>
          {/* Dropdown menu for selecting packing list */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel
              id={`select-packing-list-${pallet_id}`}
              sx={{
                textAlign: "center",
                backgroundColor: "#ffffff", // White background for the label
                padding: "0 8px", // Add some padding around the text to improve appearance
              }}
            >
              Assign Packing List
            </InputLabel>
            <Select
              labelId={`select-packing-list-${pallet_id}`}
              value={selectedPackingList}
              onChange={handleSelectChange}
              sx={{
                backgroundColor: "#ffffff", // White background for input
                color: "#333", // Dark text for contrast
                "& .MuiSelect-select": {
                  padding: "12px",
                  textAlign: "center", // Center the text in the select input
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "#ffffff", // White background for dropdown items
                    color: "#333", // Dark text for dropdown items
                  },
                },
              }}
            >
              {packingLists.map((list) => (
                <MenuItem key={list.packing_list_id} value={list.packing_list_id} sx={{ textAlign: "center" }}>
                  {list.packing_list_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Pallet Details */}
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Grid container spacing={4} alignItems="center" justifyContent="center">
              <Grid item xs={3} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Inventory2Icon sx={{ marginRight: 1, color: "#757575" }} />
                <Typography variant="h6" component="div" sx={{ color: "#333" }}>
                  {pallet_type_letter} - {pallet_id}
                </Typography>
              </Grid>
              <Grid item xs={3} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <HeightIcon sx={{ marginRight: 1, color: "#757575" }} />
                <Typography variant="h6" component="div" sx={{ color: "#333" }}>
                  Height: {height} cm
                </Typography>
              </Grid>
              <Grid item xs={3} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FitnessCenterIcon sx={{ marginRight: 1, color: "#757575" }} />
                <Typography variant="h6" component="div" sx={{ color: "#333" }}>
                  Weight: {weight} kg
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Pallet Items */}
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table size="small" aria-label="pallet items table">
              <TableHead>
                <TableRow>
                  <TableCell>Product Description</TableCell>
                  <TableCell align="right">LOT</TableCell>
                  <TableCell align="right">BBE</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredItems.map(
                  ({ id, product_description, lot, bbe, quantity }) => (
                    <TableRow key={id}>
                      <TableCell component="th" scope="row">
                        {product_description}
                      </TableCell>
                      <TableCell align="right">{lot}</TableCell>
                      <TableCell align="right">{bbe}</TableCell>
                      <TableCell align="right">{quantity}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container
      sx={{
        minHeight: "80vh", // 80% of the viewport height
        padding: "32px 16px",
        backgroundColor: "#f0f4f8",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Pallets Not On Any Packing List
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          overflowY: "auto", // Enable scrolling if content exceeds height
          marginTop: 2,
        }}
      >
        {/* Map over the list of pallets */}
        {pallets.map((pallet) => (
          <PalletCard key={pallet.pallet_id} pallet={pallet} />
        ))}
      </Box>
    </Container>
  );
}

export default PalletList;
