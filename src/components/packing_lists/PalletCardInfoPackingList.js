import React, { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const PalletPackingListCard = ({ pallet, palletItems, packingLists, onPackingListUpdate }) => {
  const { pallet_id, pallet_type_letter, weight, height, pallet_name, assigned_packing_list } = pallet;

  // State for handling selected packing list and errors
  const [selectedPackingList, setSelectedPackingList] = useState(assigned_packing_list || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle selection of a packing list for a pallet
  const handlePackingListSelection = useCallback(
    async (event) => {
      const packingListId = event.target.value;
      setSelectedPackingList(packingListId);
      setLoading(true);
      setError(null); // Clear previous errors

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL2}/set_pallet_packing_list/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              pallet_id: pallet_id,
              packing_list_id: packingListId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update pallet");
        }

        console.log(
          `Pallet ID: ${pallet_id} successfully assigned to packing list: ${packingListId}`
        );

        // Call the parent callback to remove this pallet from the list
        onPackingListUpdate(pallet_id);
      } catch (err) {
        setError("Error updating pallet. Please try again.");
        console.error("Error updating pallet:", err);
      } finally {
        setLoading(false);
      }
    },
    [pallet_id, onPackingListUpdate]
  );

  return (
    <Card
      sx={{
        cursor: "pointer",
        width: "99.9%",
        backgroundColor: "#e0f7fa",
        "&:hover": {
          boxShadow: 8,
          backgroundColor: "#b2ebf2",
        },
        borderRadius: 2,
        transition: "0.3s",
        mb: 2,
        borderBottom: 2,
        borderTop: 2,
        borderRight: 2,
        border: 0.2,
      }}
    >
      <CardContent sx={{ padding: 2 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Dropdown menu for selecting packing list */}
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel
            id={`select-packing-list-${pallet_id}`}
            sx={{
              textAlign: "center",
              backgroundColor: "#ffffff",
              padding: "0 8px",
            }}
          >
            Assign Packing List
          </InputLabel>
          <Select
            labelId={`select-packing-list-${pallet_id}`}
            value={selectedPackingList || ""}
            onChange={handlePackingListSelection}
            sx={{
              backgroundColor: "#ffffff",
              color: "#333",
              "& .MuiSelect-select": {
                padding: "12px",
                textAlign: "center",
              },
            }}
            disabled={loading}
          >
            <MenuItem value="" disabled>
              Select Packing List
            </MenuItem>
            {packingLists.map((list) => (
              <MenuItem key={list.id} value={list.id}>
                {list.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Pallet information */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={3}>
              <Typography variant="h6" sx={{ color: "#333" }}>
                {pallet_type_letter} - {pallet_name} ({pallet_id})
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6" sx={{ color: "#333" }}>
                Height: {height} cm
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6" sx={{ color: "#333" }}>
                Weight: {weight} Kg
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Table of pallet items */}
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table size="small" aria-label="pallet items table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Product Description</b>
                </TableCell>
                <TableCell align="right">
                  <b>LOT</b>
                </TableCell>
                <TableCell align="right">
                  <b>BBE</b>
                </TableCell>
                <TableCell align="right">
                  <b>Quantity</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {palletItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.product_description}</TableCell>
                  <TableCell align="right">{item.lot}</TableCell>
                  <TableCell align="right">{item.bbe}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default PalletPackingListCard;
