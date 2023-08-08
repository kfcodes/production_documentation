import React, { useEffect, useState } from "react";
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
  const [possiblePallets, setPossiblePallets] = useState([]);
  const [pallets, setPallets] = useState([]);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/possible_pallets`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPossiblePallets(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const addPallet = (id) => {
    if (possiblePallets.includes(id))
      fetch(`${process.env.REACT_APP_API_URL}/pallet/${id}`).then((res) => res.json())
        .then((palletData) => {
          pallets.push(palletData);
        });
  };

  return (
    <>
      <Header />

      <Container maxWidth="sm">
        <Box>
    
          <Typography id="modal-modal-title" variant="h6" component="h2">
            PALLETS BEING COMBINED
          </Typography>


          <Grid container padding={2} spacing={1} justifyContent="center">
            <Grid item alignItems="center"></Grid>
          </Grid>

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">PALLET</TableCell>
                  <TableCell align="center">SIZE (CM)</TableCell>
                  <TableCell align="center">HEIGHT (CM)</TableCell>
                  <TableCell align="center">WEIGHT (KG)</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {pallets.map((p) => (
                  <>
                    <TableRow key={p.pallet_id}>
                      <TableCell align="center">{p.id}</TableCell>
                      <TableCell align="left">{p.size}</TableCell>
                      <TableCell align="right">{p.height}</TableCell>
                      <TableCell align="left">{p.weight}</TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
}
