import { useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import CreateNewPalletItem from "./buttons/CreateNewPalletItemButton";
import PalletItem from "./SinglePalletItem";

export default function CreatePallet() {
  const palletId = useOutletContext();
  const [palletItems, setPalletItems] = useState([]);
  const [newPalletItems, setNewPalletItems] = useState([]);

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
            <PalletItem
              product={product}
              palletId={palletId}
              setNewPalletItems={setNewPalletItems}
            />
          </>
        ))}
      </Box>
      <CreateNewPalletItem id={palletId} state={setNewPalletItems} />
    </>
  );
}
