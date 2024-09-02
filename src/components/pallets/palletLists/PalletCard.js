import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { grey } from "@mui/material/colors";

function PalletCard({ pallet, palletItems }) {
  return (
    <Card
      sx={{
        marginBottom: 2,
        width: "100%",
        backgroundColor: grey[100], // Light grey background
        border: "1px solid black",  // Black border
        padding: 2,
        textDecoration: "none",
        transition: "0.3s",
        '&:hover': {
          boxShadow: 6,
        },
      }}
      component={Link}
      to={`/pallet/${pallet.pallet_id}/pallet_item/`}
    >
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          Pallet ID: {pallet.pallet_id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Type: {pallet.pallet_type_letter}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Weight: {pallet.weight} kg
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Height: {pallet.height} cm
        </Typography>

        <Table size="small" aria-label="pallet-items">
          <TableHead>
            <TableRow>
              <TableCell>Product Description</TableCell>
              <TableCell align="right">LOT</TableCell>
              <TableCell align="right">BBE</TableCell>
              <TableCell align="right">Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {palletItems
              .filter((item) => pallet.pallet_id === item.pallet_item_pallet_id)
              .map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.product_description}
                  </TableCell>
                  <TableCell align="right">{item.lot}</TableCell>
                  <TableCell align="right">{item.bbe}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default PalletCard;
