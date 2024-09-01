import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";

export default function CreateNewPalletItem({ palletId, reload }) {
  const createNewPalletItem = async (pallet) => {
    try {
      const palletItemData = {
        pallet_item_pallet_id: pallet,
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_URL3}/pallet_item/${pallet}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(palletItemData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create new pallet item");
      }

      const result = await response.json();
      console.log("Pallet item created:", result);

      // Call reload to refresh the pallet items list after the new item is added
      reload();
    } catch (error) {
      console.error("Error creating new pallet item:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <Container>
        <Grid container padding={10} spacing={10} justifyContent="center">
          <Grid>
            <Button
              variant="contained"
              size="large"
              onClick={() => createNewPalletItem(palletId)}
            >
              ADD PRODUCT TO PALLET
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

