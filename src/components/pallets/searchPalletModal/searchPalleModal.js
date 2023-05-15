import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { __esModule } from "quagga";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";


export default function Pallet() {
  const [pallet, setpallet] = useState(0);


  const onSubmit = () => {
      let po = {
    id: id,
    pallet: pallet,
      };
    fetch(`${process.env.REACT_APP_API_URL}/pallet/`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(po),
    });
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter The Purchase Order Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} md={8}>
              <TextField
                label="ID"
                type="number"
                value={poCode}
                onChange={(e) => setPoCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={8}>
              <TextField
                label="Pallet"
                type="text"
                value={customerCode}
                onChange={(e) => setCustomerCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={8}>
              <Container maxWidth="sm">
                <Button
                  variant="contained"
                  color="primary"
                  size="Large"
                  onClick={() => {
                    onSubmit();
                  }}
                >
                SUBMIT 
                </Button>
              </Container>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
