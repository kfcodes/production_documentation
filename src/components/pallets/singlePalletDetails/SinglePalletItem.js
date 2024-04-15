import { useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import DeletePalletItem from "../buttons/DeletePalletItemButton";

export default function PalletItem(props) {
  const product = props["product"];
  const id = props["item_id"];
  const setNewPalletItems = props["setNewPalletItemsFunction"]
  const [item_id, setitem_id] = useState();
  const [pallet_item_product_id, setpallet_item_product_id] = useState();
  const [product_description, setproduct_description] = useState();
  const [quantity, setquantity] = useState();
  const [lot, setlot] = useState();
  const [bbe, setbbe] = useState();
  const [batch, setbatch] = useState();
  const [ndn, setndn] = useState();

  useEffect(() => {
    fetchData(id);
  }, [ndn]);

  const fetchData = async (uuid) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL3}/pallet_item/${uuid}`,
    );
    const result = await response.json();
    setitem_id(result["item_id"]);
    setpallet_item_product_id(result["pallet_item_product_id"]);
    setproduct_description(result["product_description"]);
    setquantity(result["quantity"]);
    setlot(result["lot"]);
    setbbe(result["bbe"]);
    setbatch(result["batch"]);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    let palletItemData = {
      item_id: id,
      pallet_item_pallet_id: product.pallet_item_pallet_id,
      pallet_item_product_id: pallet_item_product_id,
      quantity: quantity,
      lot: lot,
      bbe: bbe,
      batch: batch,
    };
    fetch(
      `${process.env.REACT_APP_API_URL3}/pallet_item/${id}`, {
      method: "put", headers: { Accept: "application/json", "Content-Type": "application/json", }, body: JSON.stringify(palletItemData),
    }
    ).then((result) => {
      setndn(result)
    });
  };

  return (
    <>
      <Container>
        <Card variant="outlined">
          <CardContent>
            <form onSubmit={onSubmit}>
              <input
                id="item_id"
                name="item_id"
                type="hidden"
                value={item_id}
              />
              <Grid container padding={1} spacing={1} justifyContent="center">
                {product_description != null && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="text"
                      disabled="true"
                      id="product_description"
                      name="product_description"
                      value={product_description}
                      inputProps={{ style: { textAlign: "center" } }}
                    />
                  </Grid>
                )}
              </Grid>
              <Grid container padding={1} spacing={1} justifyContent="center">
                <Grid item xs={7}>
                  <TextField
                    fullWidth
                    label="Product ID"
                    type="text"
                    id="product_id"
                    name="product_id"
                    value={pallet_item_product_id}
                    inputProps={{ style: { textAlign: "center" } }}
                    onChange={(e) => setpallet_item_product_id(e.target.value)}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    inputProps={{ style: { textAlign: "center" } }}
                    onChange={(e) => setquantity(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container padding={1} spacing={1} justifyContent="center">
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Lot"
                    type="text"
                    id="lot"
                    name="lot"
                    value={lot}
                    inputProps={{ style: { textAlign: "center" } }}
                    onChange={(e) => setlot(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="BBE"
                    type="text"
                    id="bbe"
                    name="bbe"
                    value={bbe}
                    inputProps={{ style: { textAlign: "center" } }}
                    onChange={(e) => setbbe(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Batch"
                    type="text"
                    id="batch"
                    name="batch"
                    value={batch}
                    inputProps={{ style: { textAlign: "center" } }}
                    onChange={(e) => setbatch(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container padding={1} spacing={1} justifyContent="center">
                <DeletePalletItem
                  id={id}
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
  );
}
