import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Header from "../header/Header.js";

function CurrentProduction() {
  const navigate = useNavigate();
  const [production, setProduction] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/production`)
      .then((res) => res.json())
      .then(
        (result) => {
          setProduction(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const product = (id) => () => {
    navigate(`/finished_product/${id}`);
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
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">LOT  BBE</TableCell>
              <TableCell align="left">Order Qty</TableCell>
              <TableCell align="">Packing List Qty</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {production.map((p) => (
              <>
                <TableRow key={p["Product Code"]} onClick ={ product(p["Product Code"])} >
                  <TableCell align="left">{p["Product Code"]}</TableCell>
                  <TableCell align="left">{p["Description"]}</TableCell>
                  <TableCell align="left">{p["LOT  BBE"]}</TableCell>
                  <TableCell align="left">{p["Order Qty"]}</TableCell>
                  <TableCell align="left">{p["Packing List Qty"]}</TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CurrentProduction;
