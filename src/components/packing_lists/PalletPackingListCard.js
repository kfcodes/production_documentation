import React, { useMemo, useState } from "react";
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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import HeightIcon from "@mui/icons-material/Height";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

const PalletPackingListCard = ({
  pallet,
  packingLists,
  palletItems,
  handlePackingListSelection,
}) => {
  const { pallet_id, pallet_type_letter, weight, height } = pallet;
  const [selectedPackingList, setSelectedPackingList] = useState("");

  const filteredItems = useMemo(() => {
    return palletItems.filter(
      (item) => item.pallet_item_pallet_id === pallet_id,
    );
  }, [palletItems, pallet_id]);

  const handleSelectChange = async (event) => {
    const packingListId = event.target.value;
    setSelectedPackingList(packingListId);

    try {
      // Send selected packingListId and palletId to the API
      const response = await fetch(
        `${process.env.REACT_APP_API_URL2}/set_pallet_packing_list/`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pallet_id: pallet_id,
            packing_list_id: packingListId,
          }),
        },
      );

      if (response.ok) {
        console.log(
          `Pallet ID: ${pallet_id} successfully assigned to Packing List ID: ${packingListId}`,
        );
        // Optionally, trigger a callback or state update
        handlePackingListSelection(pallet_id, packingListId);
      } else {
        console.error("Failed to assign pallet to packing list.");
      }
    } catch (error) {
      console.error(
        "Error occurred while assigning pallet to packing list:",
        error,
      );
    }
  };

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
            value={selectedPackingList}
            onChange={handleSelectChange}
            sx={{
              backgroundColor: "#ffffff",
              color: "#333",
              "& .MuiSelect-select": {
                padding: "12px",
                textAlign: "center",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "#ffffff",
                  color: "#333",
                },
              },
            }}
          >
            {packingLists.map((list) => (
              <MenuItem
                key={list.packing_list_id}
                value={list.packing_list_id}
                sx={{ textAlign: "center" }}
              >
                {list.packing_list_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" component="div" sx={{ color: "#333" }}>
                {pallet_type_letter} - {pallet_id}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HeightIcon sx={{ marginRight: 1, color: "#757575" }} />
              <Typography variant="h6" component="div" sx={{ color: "#333" }}>
                Height: {height} cm
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FitnessCenterIcon sx={{ marginRight: 1, color: "#757575" }} />
              <Typography variant="h6" component="div" sx={{ color: "#333" }}>
                Weight: {weight} Kg
              </Typography>
            </Grid>
          </Grid>
        </Box>
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
                ),
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default PalletPackingListCard;
