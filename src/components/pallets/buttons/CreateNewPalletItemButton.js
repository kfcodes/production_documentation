import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";

export default function CreateNewPalletItem(id, state) {
  const palletId = id["id"];
  const updateState = id["state"];

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
      updateState(result);
    });
  };

  return (
    <>
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
