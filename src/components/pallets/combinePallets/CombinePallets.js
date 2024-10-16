import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Header from "../../header/Header";

export default function CombinePallets() {
  const [pssiblePallets, setPossiblePallets] = useState([]);
  const [palletId, setPalletId] = useState();
  const [palletDataArray, setPalletDataArray] = useState([]);
  const [selectedPallets, setSelectePallets] = useState([]);
  const [height, setHeight] = useState();

  const addPallet = (id) => {
    console.log(palletDataArray);
    palletDataArray.map((p) => {
      console.log(`values for p id : ${p.pallet_id}`);
      console.log(`values for p id : ${p.weight}`);
      console.log(`values for p id : ${p.height}`);
    });
    if (selectedPallets.includes(id)) setPalletId("");
    else
      fetch(`${process.env.REACT_APP_API_URL3}/pallet/${id}`)
        .then((res) => res.json())
        .then((data) => JSON.parse(JSON.stringify(data)))
        .then((palletData) => {
          setSelectePallets([...selectedPallets, id]);
          setPalletDataArray([...palletDataArray, palletData]);
          setPalletId("");
        });
  };

  const saveAndPrintLabel = () => {
    const data = {
      id: selectedPallets,
      pallet_list: selectedPallets,
      height: height,
    };
    fetch(`${process.env.REACT_APP_API_URL3}/combine_pallets`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      console.log(result);
    });
  };

  return (
    <>
      <br />
      <br />
      <Header />
      <Container maxWidth="sm">
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            PALLETS BEING COMBINED
          </Typography>
          <Grid container padding={2} spacing={1} justifyContent="center">
            <Grid item alignItems="center"></Grid>
          </Grid>
          <Grid container padding={2} spacing={4} justifyContent="center">
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">HEIGHT (cm)</TableCell>
                    <TableCell align="center">WEIGHT (kg)</TableCell>
                    <TableCell align="center">PALLET ID</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {palletDataArray.map((p) => (
                    <>
                      <TableRow key={p.pallet_id}>
                        <TableCell align="center">{p.height} cm</TableCell>
                        <TableCell align="center">{p.weight} kg</TableCell>
                        <TableCell align="center"> {p.pallet_id}</TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <hr />
          <Grid container padding={2} spacing={4} justifyContent="center">
            <Grid item xs={6} md={8}>
              <TextField
                autoFocus
                label="PALLET ID"
                type="number"
                value={palletId}
                onChange={(e) => {
                  setPalletId(e.target.value);
                  if (e.target.value.length == 5) {
                    addPallet(e.target.value);
                  }
                }}
              />
            </Grid>
          </Grid>
          {selectedPallets.length > 1 && (
            <Grid container padding={2} spacing={4} justifyContent="center">
              <Grid item xs={6} md={8}>
                <TextField
                  label="COMBINED PALLET HEIGHT"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </Grid>
            </Grid>
          )}
          {height && (
            <Grid container padding={1} spacing={4} justifyContent="center">
              <Grid item xs={5} md={8}>
                <Button
                  variant="contained"
                  color="error"
                  size="Large"
                  onClick={() => {
                    saveAndPrintLabel();
                  }}
                >
                  SAVE DATA AND PRINT LABEL
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
    </>
  );
}
