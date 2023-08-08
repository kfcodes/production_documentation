import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Header from "../header/Header.js";

const style = {
  width: "100%",
  border: "none",
  bgcolor: "#04AA6D",
  color: "white",
  padding: "14px 28px",
  FontFace: "26px",
  cursor: "pointer",
  display: "flex",
};

function Mps() {
  const [mps, setMps] = useState([]);
  const [update, setUpdate] = useState("");

  const setMpsData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/mps`)
      .then((res) => res.json())
      .then(
        (result) => {
          setMps(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    setMpsData();
  }, [update]);

  const printBoxLabel = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/box_label/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response);
    });
  };

  const Eol2 = (id) => () => {
    console.log(id);
  };

  const navItems = [
    { title: "Pallets", key: "" },
    { title: "Full Production Schedule ", key: "full_mps" },
  ];

  const buttonList = () => {
    <Container>
      <Grid container padding={2} spacing={3} justifyContent="center">
        <Grid item alignItems="center">
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={4}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Button
              href="/full_mps"
              size="small"
              color="success"
              variant="contained"
            >
              Full Production Schedule
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>;
  };

  return (
    <>
      <Header />
      <buttonList />
      <Grid container padding={2} spacing={1} justifyContent="center">
        <Grid item alignItems="center"></Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="right">Schedule</TableCell>
              <TableCell align="left">Order</TableCell>
              <TableCell align="center">Packing List</TableCell>
              <TableCell align="right">LOT</TableCell>
              <TableCell align="left">BBE</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {mps.map((p) => (
              <>
                <TableRow key={p.mps_id} onClick={Eol2(p.eol_id)}>
                  <TableCell align="center">{p.id}</TableCell>
                  <TableCell align="left">{p.description}</TableCell>
                  <TableCell align="right">{p.mps_quantity}</TableCell>
                  <TableCell align="left">{p.po_quantity}</TableCell>
                  <TableCell align="center">{p.pallet_total}</TableCell>
                  <TableCell align="right">{p.pl_lot}</TableCell>
                  <TableCell align="left">{p.pl_bbe}</TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
// <TableCell align="right">{p.lot}</TableCell>
// <TableCell align="left">{p.bbe}</TableCell>
// <ButtonGroup
//   orientation="vertical"
//   variant="outlined"
//   size="small"
//   aria-label="vertical outlined button group"
// >
//   {p.eol_id ? (
//     <Eol eolId={p.eol_id} setUpdate={setUpdate}/>
//   ) : (
//     <CreateEol
//       productId={p.id}
//       po={p.po}
//       setUpdate={setUpdate}
//     />
//   )}
// </ButtonGroup>

export default Mps;
