import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import Grid from "@mui/material/Unstable_Grid2";
import ListItem from "@mui/material/ListItem";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ButtonGroup from "@mui/material/ButtonGroup";
// import Eol from "./eol";
// import CreateEol from "./createEol";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
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
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const setMpsData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/mps`)
      // fetch(`${process.env.REACT_APP_API_URL}/mps2`)
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
    // fetch(`${process.env.REACT_APP_API_URL}/mps`)
    //   .then((res) => res.json())
    //   .then(
    //     (result) => {
    //       setMps(result);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
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
    // const Eol2 = () => {

    // <Eol po={p.po_quantity} productId={p.id} />
    console.log(id);
  };

  // {mps.map((p) => (
  //   <li key={p.mps_id}>
  //   <br />
  //   {p.eol_id}
  //   <br />
  //   {p.description}
  //   <br />
  //   mps={p.mps_quantity} po={p.po_quantity} eol={p.eol_total} pallets={p.pallet_total}
  //   <br />
  //       <button onClick={() => printBoxLabel(p.eol_id)}>
  //   Print Box Label
  //       </button>
  //   </li>
  // ))}

  // onClick={() => createEOL(p.eol_id)}>
  // <Eol po={p.po} poQuantity={p.po_quantity} productId={p.id} />
  // <TableCell align="right">EOL LOT</TableCell>
  // <TableCell align="left">EOL BBE</TableCell>
  // <TableCell align="right">PL LOT</TableCell>
  // <TableCell align="left">PL BBE</TableCell>
  //     <TableCell align="right">{p.pl_lot}</TableCell>
  //     <TableCell align="left">{p.pl_bbe}</TableCell>
  //     <TableCell align="right">{p.lot}</TableCell>
  //     <TableCell align="left">{p.bbe}</TableCell>
  // <Eol eolId={p.eol_id} po={p.po} productId={p.id} />

  // <TableCell align="right">End of Line Sheets</TableCell>
  // <TableCell align="right">{p.eol_total}</TableCell>
  const navItems = [
    { title: "Pallets", key: "" },
    { title: "Full Production Schedule ", key: "full_mps" },
  ];

  return (
    <>
    <Header />
        <Grid container padding={2} spacing={1} justifyContent="center">
          <Grid item alignItems="center">
          </Grid>
        </Grid>
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
        </Container>
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
