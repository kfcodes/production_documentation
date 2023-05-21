import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Header from "../../header/Header.js";
import CreateNewPalletButton from "../buttons/CreateNewPalletButton";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

function LatestPallets() {
  const [pallets, setPallets] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/latest_pallet_data/`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPallets(result);
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const listItemsNew = pallets.map((pallet) => (
    <Card>
      <CardActionArea>
        <CardContent>
          <Grid container padding={2} spacing={3} justifyContent="center">
            <Grid item xs={4}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                align="center"
                fontWeight="bold"
              >
                {pallet.PALLET}
              </Typography>
            </Grid>
            }
            <Grid item xs={8}>
              <Typography variant="body2" color="text.secondary">
                {pallet.DESCRIPTION}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  ));

  const listItems = pallets.map((pallet) => (
    <Card>
      <CardActionArea>
        <CardContent>
          <Grid container padding={2} spacing={3} justifyContent="center">
            <Grid item xs={4}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                align="center"
                fontWeight="bold"
              >
                {pallet.PALLET}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                align="center"
              >
                {pallet.DIMENSIONS}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                align="center"
              >
                {pallet.WEIGHT}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" color="text.secondary">
                {pallet.ID}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2" color="text.secondary">
                {pallet.DESCRIPTION}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" color="text.secondary">
                {pallet.LOT_BBE}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" color="text.secondary">
                {pallet.BATCH}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" color="text.secondary">
                {pallet.QTY}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  ));

  // <TableRow
  //   sx={{ "& > *": { borderBottom: "unset" } }} key={pallet.PALLET} > <TableCell> {pallet.ID} </TableCell> <TableCell > {pallet.DESCRIPTION} </TableCell> <TableCell align="center">
  //     {pallet.LOT_BBE}
  //   </TableCell>
  //   <TableCell align="center">{pallet.BATCH} kg</TableCell>
  //   <TableCell align="center">{pallet.QUANTITY} cm</TableCell>
  //   <TableCell> {pallet.DIMENSIONS} </TableCell>
  //   <TableCell> {pallet.WEIGHT} </TableCell>
  //   <TableCell> {pallet.PALLET} </TableCell>
  //   </TableRow>
  // ));

  // {pallet.HEIGHT ? (
  //   <Button
  //     variant="outlined"
  //     size="small"
  //     color="secondary"
  //     href={`/pallet/${pallet.pallet_id}/pallet_item/`}
  //   >
  //     Change pallet Details
  //   </Button>

  // {pallets}

  return (
    <>
      <Header />
      <br />
      <Container>
        <br />
        {pallets.map((pallet, index) => (
              <>
                <Card>
                  {" "}
                  <CardActionArea>
                    {" "}
                    <CardContent>
                      {" "}
                      <Grid
                        container
                        padding={2}
                        spacing={3}
                        justifyContent="center"
                      >
                        {" "}
                        <Grid item xs={4}>
                          {" "}
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            align="center"
                            fontWeight="bold"
                          >
                            {" "}
                            {pallet.pallet}{" "}
                          </Typography>{" "}
                        </Grid>{" "}
                        <Grid item xs={2}>
                          {" "}
                          <Typography variant="body2" color="text.secondary">
                            {" "}
                            {pallet.type} {" "}
                          </Typography>{" "}
                        </Grid>{" "}
                        <Grid item xs={2}>
                          {" "}
                          <Typography variant="body2" color="text.secondary">
                            {" "}
          Height: {pallet.height} CM{" "}
                          </Typography>{" "}
                        </Grid>{" "}
                        <Grid item xs={2}>
                          {" "}
                          <Typography variant="body2" color="text.secondary">
                            {" "}
          Weight: {pallet.weight} KG{" "}
                          </Typography>{" "}
                        </Grid>{" "}
                      </Grid>{" "}
                      <Divider  />
        {pallet.products.map((product) => (
                      <Grid
                        container
                        padding={1}
                        spacing={5}
                        justifyContent="center"
                      >
                        {" "}
                        <Grid item xs={2}>
                          {" "}
                          <Typography variant="body2" color="text.secondary">
                            {" "}
{product.ID}{" "}
                          </Typography>{" "}
                        </Grid>{" "}
                        <Grid item xs={5}>
                          {" "}
                          <Typography variant="body2" color="text.secondary">
                            {" "}
{product.DESCRIPTION}{" "}
                          </Typography>{" "}
                        </Grid>{" "}
                        <Grid item xs={1}>
                          {" "}
                          <Typography variant="body2" color="text.secondary">
                            {" "}
{product.LOT}{" "}
                          </Typography>{" "}
                        </Grid>{" "}
                        <Grid item xs={1}>
                          {" "}
                          <Typography variant="body2" color="text.secondary">
                            {" "}
{product.BBE}{" "}
                          </Typography>{" "}
                        </Grid>{" "}
                        <Grid item xs={2}>
                          {" "}
                          <Typography variant="body2" color="text.secondary">
                            {" "}
{product.BATCH}{" "}
                          </Typography>{" "}
                        </Grid>{" "}
                        <Grid item xs={1}>
                          {" "}
                          <Typography variant="body2" color="text.secondary">
                            {" "}
{product.QTY}{" "}
                          </Typography>{" "}
                        </Grid>{" "}
                        </Grid>
        ))}
                    </CardContent>{" "}
                  </CardActionArea>{" "}
                </Card>{" "}
              </>
        ))}
      </Container>
    </>
  );
}

export default LatestPallets;
