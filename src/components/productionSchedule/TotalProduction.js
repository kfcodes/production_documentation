import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import List from "@mui/material/List";
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

function FullMps() {
  const [mps, setMps] = useState([]);
  const [update, setUpdate] = useState("");

  const setMpsData = () => {
    fetch(`${process.env.REACT_APP_API_URL3}/full_mps/`)
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

  const navItems = [
    { title: "Pallets", key: "" },
    { title: "Current Production", key: "mps" },
  ];

  return (
    <>
      <Header />
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
                <TableRow key={p.mps_id}>
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

export default FullMps;
