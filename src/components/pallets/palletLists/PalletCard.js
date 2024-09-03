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
import { useNavigate } from "react-router-dom";

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
        width: "100%", // Make the card span the full width
        boxSizing: "border-box",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Typography variant="h6">Pallet ID: {pallet_id}</Typography>
        <Typography variant="body1">Type: {pallet_type_letter}</Typography>
        <Typography variant="body1">Weight: {weight} kg</Typography>
        <Typography variant="body1">Height: {height} cm</Typography>

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
