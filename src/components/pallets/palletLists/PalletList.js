import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grow from "@mui/material/Grow";
import PalletCard from "./PalletCard";  // Ensure you have the correct path
import CreateNewPalletButton from '../buttons/CreateNewPalletButton'; // Add this line

function PalletList() {
  const [pallets, setPallets] = useState([]);
  const [palletItems, setPalletItems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL2}/new_pallets/`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPallets(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL2}/new_pallet_items/`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPalletItems(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <>
      <Box component="span" sx={{ p: 2, border: "1px dashed grey" }}>
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
        <Grid container direction="column" spacing={2} padding={2}>
          {pallets.map((pallet, index) => (
            <Grow
              in={true}
              style={{ transformOrigin: "0 0 0" }}
              {...(index ? { timeout: index * 500 } : {})}
              key={pallet.pallet_id}
            >
              <Grid item>
                <PalletCard pallet={pallet} palletItems={palletItems} />
              </Grid>
            </Grow>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default PalletList;
