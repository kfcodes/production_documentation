import { useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import DeletePalletItem from "./DeletePalletItemButton";

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

  const onSubmit = (event) => {
    event.preventDefault();
    let palletItemData = {
      pallet_item_pallet_id: palletId[0],
      item_id: event.target.item_id.value,
      pallet_item_product_id: event.target.product_id.value,
      quantity: event.target.quantity.value,
      lot: event.target.lot.value,
      bbe: event.target.bbe.value,
      batch: event.target.batch.value,
    };
    console.log(palletItemData);
    fetch(
      `${process.env.REACT_APP_API_URL}/pallet_item/${palletItemData.item_id}`,
      {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(palletItemData),
      }
    ).then((result) => {
      setNewPalletItems(result);
    });
  };

  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Container>
          <div>
            <Grid container padding={1} spacing={1} justifyContent="center">
              <Grid item>
                <h1>PALLET ITEMS</h1>
              </Grid>
            </Grid>
          </div>
        </Container>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
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
                      {product.product_description != null && (
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
                      )}
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
                      <DeletePalletItem
                        id={product.item_id}
                        state={setNewPalletItems}
                      />
                      <Grid xs={4}>
                        {" "}
                        <Button
                          type="submit"
                          variant="contained"
                          color="secondary"
                          size="large"
                          sx={{ marginLeft: "auto" }}
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
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Container>
          <Grid container padding={10} spacing={10} justifyContent="center">
            <Grid>
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  createNewPalletItem(palletId);
                }}
              >
                ADD PRODUCT TO PALLET
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
