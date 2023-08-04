import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Po() {
  const [possiblePallets, setPossiblePallets] = useState([]);
  const [pallets, setPallets] = useState(0);
  const [height, setHeight] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/eol/${eolId}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPossiblePallets(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const onSubmit = () => {
      let po = {
    po: poCode,
    customerCode: customerCode,
      };
    // console.log(label);
    fetch(`${process.env.REACT_APP_API_URL}/po/`, {
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
    ENTER IDS OF PALLETS TO COMBINE 
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} md={8}>
              <TextField
                label="PALLET ID"
                type="number"
                value={pallet_id}
                onChange={(e) => setPallets(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={8}>
              <TextField
                label="TOTAL PALLET HEIGHT"
                type="number"
                value={heigh}
                onChange={(e) => setHeight(e.target.value)}
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
                SAVE AND PRINT LABEL
                </Button>
              </Container>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
