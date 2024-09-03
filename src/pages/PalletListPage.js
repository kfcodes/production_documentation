import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button"; // Ensure Button is imported
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
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import CreateNewPalletButton from "../components/pallets/buttons/CreateNewPalletButton";

function PalletList() {
  const [pallets, setPallets] = useState([]);
  const [palletItems, setPalletItems] = useState([]);
  const navigate = useNavigate(); // useNavigate instead of useHistory

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL2}/new_pallets/`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPallets(result);
        },
        (error) => {
          console.error("Error fetching pallets:", error);
        }
      );
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL2}/new_pallet_items/`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPalletItems(result);
        },
        (error) => {
          console.error("Error fetching pallet items:", error);
        }
      );
  }, []);

  const handleCardClick = (palletId) => {
    navigate(`/pallet/${palletId}`); // Use navigate function
  };

  return (
    <Box sx={{ p: 2, border: "1px dashed grey" }}>
      <Container>
        <Grid container padding={2} spacing={3} justifyContent="center">
          <Grid item>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={4}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Button
                href="/all_pallets"
                size="small"
                color="success"
                variant="contained"
              >
                ALL PALLETS
              </Button>
              <CreateNewPalletButton />
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {pallets.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="h6">No pallets available</Typography>
        </Box>
      ) : (
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {pallets.map((pallet) => {
            const { pallet_id, pallet_type_letter, weight, height } = pallet;

            const filteredItems = palletItems.filter(
              (item) => item.pallet_item_pallet_id === pallet_id
            );

            return (
              <Grid item xs={12} md={6} key={pallet_id}>
                <Card
                  onClick={() => handleCardClick(pallet_id)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">Pallet ID: {pallet_id}</Typography>
                    <Typography variant="body1">
                      Type: {pallet_type_letter}
                    </Typography>
                    <Typography variant="body1">
                      Weight: {weight} kg
                    </Typography>
                    <Typography variant="body1">
                      Height: {height} cm
                    </Typography>

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
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}

export default PalletList;
