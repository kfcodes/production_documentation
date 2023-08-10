import React, { useEffect, useRef, useState } from "react";
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
import EnterHeightMenu from "./EnterHeightMenu";

export default function CombinePallets() {
  const [possiblePallets, setPossiblePallets] = useState([]);
  const [palletId, setPalletId] = useState(0);
  const [palletDataArray, setPalletDataArray] = useState([]);
  const [selectedpallets, setSelectePallets] = useState([]);
  const [height, setHeight] = useState(0);
  const refHeight = useRef();
  // const height = useRef().current.getChildCount();

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

  const getHeight = () => {
    const childState = refHeight.current.getChildCount();
    console.log(`The state is ${childState}`);
    setHeight(childState);
  };

  const ppp = () => {
    console.log(selectedpallets);
    console.log(palletDataArray);
  };

  const addPallet = (id) => {
    if (possiblePallets.includes(id)) console.log(possiblePallets);
    fetch(`${process.env.REACT_APP_API_URL}/pallet_details/${id}`)
      .then((res) => res.json())
      .then((palletData) => {
        setSelectePallets([...selectedpallets, id]);
        setPalletDataArray([...palletDataArray, ...palletData]);
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

          <Grid container padding={2} spacing={4} justifyContent="center">
            <Grid item xs={6} md={8}>
              <TextField label="PALLET HEIGHT" type="number" value={height} />
            </Grid>
          </Grid>

          <hr />

          <Grid container padding={2} spacing={4} justifyContent="center">
            <Grid item xs={6} md={8}>
              <TextField
                label="PALLET ID"
                type="number"
                value={palletId}
                onChange={(e) => setPalletId(e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container padding={2} spacing={4} justifyContent="center">
            <Grid item xs={6} md={8}>
              <Button
                variant="contained"
                color="primary"
                size="Large"
                onClick={() => {
                  addPallet(palletId);
                }}
              >
                ADD PALLET
              </Button>
            </Grid>
          </Grid>

          <Grid container padding={2} spacing={4} justifyContent="center">
            <Grid item xs={6} md={8}>
              <EnterHeightMenu ref={refHeight} get={getHeight()} />
            </Grid>
          </Grid>

          <Grid container padding={1} spacing={4} justifyContent="center">
            <Grid item xs={5} md={8}>
              <Button
                variant="contained"
                color="error"
                size="Large"
                onClick={() => {
                  getHeight();
                }}
              >
                SAVE DATA AND PRINT LABEL
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
