import { useNavigate } from "react-router-dom";
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

const style = {
  width: "90%",
  bgcolor: "background.paper",
  margin: 2,
};

function LatestPallets() {
  const [pallets, setPallets] = useState([]);
  const navigate = useNavigate();

  function navigateFunction(palletid) {
    navigate(`/pallet/${palletid}/pallet_item/`);
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/latest_pallet_data/`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPallets(result);
        },
        (error) => {
          console.log(error);
        },
      );
  }, []);

  const listItemsNew = pallets.map((pallet) => (
    <Card>
      <CardActionArea>
        <CardContent>
          <Grid container padding={0} spacing={3} justifyContent="center">
            <Grid item xs={4}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                align="center"
                fontWeight="bold"
              >
                {pallet.pallet_id}
              </Typography>
            </Grid>
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
              <Typography
                variant="body1"
                color="text.secondary"
                fontWeight="bold"
              >
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

  const actionClick = (id) => {
    console.log(`You clicked the card with id of ${id}`);
    navigateFunction(id);
  };

  return (
    <>
      <Header />
      <br />
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
      <Box
        sx={{ backgroundColor: "lightgrey", display: "flex", flexWrap: "wrap" }}
      >
        <Container maxWidth="md">
          <br />
          {pallets.map((pallet, index) => (
            <>
              <Card
                sx={{
                  width: "90%",
                  margin: 2,
                  bgcolor:
                    pallet.height && pallet.products[0]
                      ? "paper"
                      : "lightsalmon",
                }}
              >
                {" "}
                <CardActionArea onClick={() => actionClick(pallet.pallet)}>
                  {" "}
                  <CardContent>
                    {" "}
                    <Grid container padding={0} spacing={3}>
                      {" "}
                      <Grid item xs={3}>
                        {" "}
                        <Typography
                          variant="subtitle1"
                          component="div"
                          align="left"
                          fontWeight="bold"
                        >
                          {" "}
                          {pallet.pallet}{" "}
                        </Typography>{" "}
                      </Grid>{" "}
                      <Grid item xs={3}>
                        {" "}
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                          align="left"
                        >
                          {" "}
                          {pallet.type}{" "}
                        </Typography>{" "}
                      </Grid>{" "}
                      <Grid item xs={3}>
                        {" "}
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                          align="left"
                        >
                          {" "}
                          Height: {pallet.height} CM{" "}
                        </Typography>{" "}
                      </Grid>{" "}
                      <Grid item xs={3}>
                        {" "}
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                          align="left"
                        >
                          {" "}
                          Weight: {pallet.weight} KG{" "}
                        </Typography>{" "}
                      </Grid>{" "}
                    </Grid>{" "}
                    <Divider />
                    {pallet.products.map((product) => (
                      <Grid
                        container
                        padding={0}
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
      </Box>
    </>
  );
}

export default LatestPallets;
