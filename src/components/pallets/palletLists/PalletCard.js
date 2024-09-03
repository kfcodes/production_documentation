import React, { useMemo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

// Importing icons
import Inventory2Icon from '@mui/icons-material/Inventory2';  // Pallet Type/Icon
import HeightIcon from '@mui/icons-material/Height';  // Height Icon
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';  // Weight Icon

const PalletCard = React.memo(({ pallet, palletItems }) => {
  const { pallet_id, pallet_type_letter, weight, height } = pallet;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/pallet/${pallet_id}`);
  };

  const filteredItems = useMemo(() => {
    return palletItems.filter(
      (item) => item.pallet_item_pallet_id === pallet_id
    );
  }, [palletItems, pallet_id]);

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        cursor: "pointer",
        width: "100%",
        boxSizing: "border-box",
        backgroundColor: "#e0f7fa",  // Light teal background color
        "&:hover": {
          boxShadow: 8,
          backgroundColor: "#ffecb3",  // Light orange background color on hover
        },
        borderRadius: 2,
        transition: "0.3s",  // Smooth transition for hover effect
      }}
    >
      <CardContent sx={{ padding: 3 }}>
        {/* Pallet Details centered horizontally */}
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
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
});

export default PalletCard;
