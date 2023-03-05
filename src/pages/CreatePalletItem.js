// import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";
import IndividualPalletItem from "./each_pallet_item";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function CreatePallet() {
  const palletId = useOutletContext();
  const [palletItems, setPalletItems] = useState([]);
  const [newPalletItems, setNewPalletItems] = useState([]);

  const createNewPalletItem = (pallet) => {
    let palletItemData = {
      pallet_item_pallet_id: pallet,
    };
    fetch(`${process.env.REACT_APP_API_URL}/pallet_item/${pallet}`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(palletItemData),
    }).then((result) => {
      setNewPalletItems(result);
    });
  };

  // .then(
  const printState = () => {
    console.log("These are the pallet items");
    console.log(palletItems);
  };

  const getPalletProducts = () => {
    fetch(`${process.env.REACT_APP_API_URL}/pallet_items/${palletId}`)
      .then((response) => response.json())
      .then((result) => {
        setPalletItems(result);
        console.log("The state should be updated");
        // console.log(result)
      });
  };

  const deletePalletItem = (item_id) => {
    fetch(`${process.env.REACT_APP_API_URL}/pallet_item/${item_id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((result) => {
      setNewPalletItems(result);
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/pallet_items/${palletId}`
      );
      const result = await response.json();
      setPalletItems(result);
      console.log("The state should be updated");
    };
    fetchData();
  }, [newPalletItems]);


  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
    <div>
        <Grid container padding={1} spacing={1} justifyContent="center">
          <Grid item xs={12}>
            <h1>Products on the pallet</h1>
          </Grid>
        </Grid>
    </div>
        {palletItems.map((product) => (
          <>
            <Container>
              <Card variant="outlined">
                <CardContent>
                  <form onSubmit={onSubmit}>
                    <input
                      id="item_id"
                      name="item_id"
                      type="hidden"
                      value={product.item_id}
                    />
                    <Grid
                      container
                      padding={1}
                      spacing={1}
                      justifyContent="center"
                    >
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          type="text"
                          disabled="true"
                          id="product_description"
                          name="product_description"
                          value={product.product_description}
                          inputProps={{ style: { textAlign: "center" } }}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      padding={1}
                      spacing={1}
                      justifyContent="center"
                    >
                      <Grid item xs={7}>
                        <TextField
                          fullWidth
                          label="Product ID"
                          type="text"
                          id="product_id"
                          name="product_id"
                          value={product.pallet_item_product_id}
                          inputProps={{ style: { textAlign: "center" } }}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          fullWidth
                          label="Quantity"
                          type="number"
                          id="quantity"
                          name="quantity"
                          value={product.quantity}
                          inputProps={{ style: { textAlign: "center" } }}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      padding={1}
                      spacing={1}
                      justifyContent="center"
                    >
                      <Grid item xs={4}>
                        <TextField
                          fullWidth
                          label="Lot"
                          type="text"
                          id="lot"
                          name="lot"
                          value={product.lot}
                          inputProps={{ style: { textAlign: "center" } }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          fullWidth
                          label="BBE"
                          type="text"
                          id="bbe"
                          name="bbe"
                          value={product.bbe}
                          inputProps={{ style: { textAlign: "center" } }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          fullWidth
                          label="Batch"
                          type="text"
                          id="batch"
                          name="batch"
                          value={product.batch}
                          inputProps={{ style: { textAlign: "center" } }}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      padding={1}
                      spacing={1}
                      justifyContent="center"
                    >
                      <Grid xs={5}>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => {
                            deletePalletItem(product.item_id);
                          }}
                        >
                          DELETE
                        </Button>
                      </Grid>
                      <Grid xs={6}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="secondary"
                        >
                          SAVE
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Container>
          </>
        ))}
      </Box>
    </>
  );
}
