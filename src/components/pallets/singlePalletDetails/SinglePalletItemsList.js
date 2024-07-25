import { useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import CreateNewPalletItem from "../buttons/CreateNewPalletItemButton";
import PalletItem from "./SinglePalletItem";

export default function SinglePalletItemsList(props) {
  const palletId = props['pallet_id'];
  const [palletItems, setPalletItems] = useState([]);
  const [newPalletItems, setNewPalletItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL3}/pallet_items/${palletId}`,
      );
      const result = await response.json();
      setPalletItems(result);
    };
    fetchData();
  }, [newPalletItems]);

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
      {palletItems != [] && palletItems != null &&
        < Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {palletItems.map((product) => (
            <>
              <PalletItem
                product={product}
                item_id={product.item_id}
                setNewPalletItemsFunction={setNewPalletItems}
              />
            </>
          ))}
        </Box >
      }
      <CreateNewPalletItem
        pallet_id={palletId}
        setNewPalletItemsFunction={setNewPalletItems}
      />
    </>
  );
}

