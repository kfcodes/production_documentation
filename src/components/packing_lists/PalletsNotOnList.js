import React, { useEffect, useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

// Importing icons
import Inventory2Icon from '@mui/icons-material/Inventory2';  // Pallet Type/Icon
import HeightIcon from '@mui/icons-material/Height';  // Height Icon
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';  // Weight Icon

// Main component for displaying the list of pallets
function PalletList() {
  const [pallets, setPallets] = useState([]);
  const [palletItems, setPalletItems] = useState([]);
  const [packingLists, setPackingLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all data from the API concurrently
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
        setPackingLists(Object.values(packingListsData)); // Convert the object to an array
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePackingListSelection = async (palletId, packingListId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL2}/update_pallet/${palletId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ packing_list_id: packingListId }),
      });

      if (response.ok) {
        // Log the pallet ID to the console when selected
        console.log(`Pallet ID: ${palletId}`);

        // Remove the pallet from the list after it has been assigned to a packing list
        setPallets(pallets.filter(pallet => pallet.pallet_id !== palletId));
      } else {
        console.error("Error updating pallet");
      }
    } catch (error) {
      console.error("Error updating pallet:", error);
    }
  };

  const PalletCard = ({ pallet }) => {
    const { pallet_id, pallet_type_letter, weight, height } = pallet;
    const [selectedPackingList, setSelectedPackingList] = useState('');

    const filteredItems = useMemo(() => {
      return palletItems.filter(
        (item) => item.pallet_item_pallet_id === pallet_id
      );
    }, [palletItems, pallet_id]);

    const handleSelectChange = (event) => {
      const packingListId = event.target.value;
      setSelectedPackingList(packingListId);
      handlePackingListSelection(pallet_id, packingListId);  // Handle selection update
    };

    return (
      <Card
        sx={{
          cursor: "pointer",
          width: "100%",
          boxSizing: "border-box",
          backgroundColor: "#e0f7fa",  // Light teal background color
          "&:hover": {
            boxShadow: 8,
            backgroundColor: "#ffecb3",  // Light orange background color on hover
          },
          borderRadius: 3,
          transition: "0.3s",  // Smooth transition for hover effect
        }}
      >
        <CardContent sx={{ padding: 2 }}>
          {/* Dropdown menu for selecting packing list */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id={`select-packing-list-${pallet_id}`} sx={{ textAlign: 'center' }}>Assign Packing List</InputLabel>
            <Select
              labelId={`select-packing-list-${pallet_id}`}
              value={selectedPackingList}
              onChange={handleSelectChange}
              sx={{
                textAlign: 'center',  // Center the text in the dropdown
                backgroundColor: "#e0f7fa",  // Match the card's background color
                color: '#333',  // Dark text for contrast
                "& .MuiSelect-select": {
                  padding: "12px",
                  textAlign: "center",  // Center the text inside the dropdown input
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "#e0f7fa",  // Match the dropdown's background with the card
                    color: '#333',  // Dark text for dropdown items
                  }
                }
              }}
            >
              {packingLists.map((list) => (
                <MenuItem key={list.packing_list_id} value={list.packing_list_id} sx={{ textAlign: 'center' }}>
                  {list.packing_list_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Pallet Details centered horizontally */}
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Grid container spacing={4} alignItems="center" justifyContent="center">
              {/* Pallet Type and ID */}
              <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Inventory2Icon sx={{ marginRight: 1, color: '#757575' }} />
                <Typography variant="h6" component="div" sx={{ color: '#333' }}>
                  {pallet_type_letter} - {pallet_id}
                </Typography>
              </Grid>

              {/* Pallet Height */}
              <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <HeightIcon sx={{ marginRight: 1, color: '#757575' }} />
                <Typography variant="h6" component="div" sx={{ color: '#333' }}>
                  Height: {height} cm
                </Typography>
              </Grid>

              {/* Pallet Weight */}
              <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FitnessCenterIcon sx={{ marginRight: 1, color: '#757575' }} />
                <Typography variant="h6" component="div" sx={{ color: '#333' }}>
                  Weight: {weight} kg
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Pallet Items listed below */}
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
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>;
  }

  return (
    <Container sx={{ padding: '32px 16px', backgroundColor: '#f0f4f8', borderRadius: '16px' }}>
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
            <Grid item xs={12} key={pallet.pallet_id}>
              <PalletCard pallet={pallet} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default PalletList;
