import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import PrintLabeLButton from "../buttons/PrintPalletLabelButton";
import Header from "../../header/Header";
import SinglePalletItemsList from "./SinglePalletItemsList";

export default function SinglePallet() {
  const params_pallet_id = useParams()["palletid"];
  const [pallet_id, setPallet_id] = useState("");
  const [palletType, setPalletType] = useState("");
  const [emptyweight, setEmptyweight] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL3}/pallet_details/${params_pallet_id}`,
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result[0]);
          setPallet_id(result[0].pallet_id);
          setPalletType(result[0].pallet_type);
          setEmptyweight(result[0].empty_weight);
          setWeight(result[0].weight);
          setHeight(result[0].height);
        },
        (error) => {
          console.log(error);
        },
      );
  }, []);

  const onSubmit = () => {
    let palletData = {
      pallet_id: pallet_id,
      pallet_type: palletType,
      empty_weight: emptyweight,
      weight: weight,
      height: height,
    };
    fetch(`${process.env.REACT_APP_API_URL3}/pallet/${pallet_id}`, {
      method: "put",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(palletData),
    }).then((res) => res.json());
  };

  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Container>
          <Grid container padding={1} spacing={1} justifyContent="center">
            <Grid item>
              <h1>PALLET {pallet_id} DATA</h1>
            </Grid>
          </Grid>
          <div>
            <Grid container padding={2} spacing={2} justifyContent="center">
              <Grid item xs={8} sOffset={3}>
                <TextField
                  fullWidth
                  disabled
                  value={pallet_id}
                  id="outlined-adornment-amount"
                  label="pallet_id"
                />
              </Grid>
            </Grid>
            <Grid container padding={2} spacing={2} justifyContent="center">
              <Grid item sm={6}>
                <Select
                  fullWidth
                  label="Pallet Size"
                  id="demo-simple-select"
                  value={palletType}
                  onChange={(e) => setPalletType(e.target.value)}
                >
                  <MenuItem value={1}>Standard Big Pallet</MenuItem>
                  <MenuItem value={2}>Small Pallet</MenuItem>
                  <MenuItem value={3}>Euro Pallet</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid container padding={2} spacing={2} justifyContent="center">
              <Grid item sm={4}>
                <TextField
                  fullWidth
                  label="Empty Pallet Weight"
                  type="number"
                  value={emptyweight}
                  onChange={(e) => setEmptyweight(e.target.value)}
                  inputProps={{ style: { textAlign: "center" } }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end"> kg</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  label="Full Pallet Weight"
                  id="outlined-end-adornment"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  fullWidth
                  inputProps={{ style: { textAlign: "center" } }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end"> kg</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  label="Pallet Height"
                  id="outlined-end-adornment"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  fullWidth
                  inputProps={{ style: { textAlign: "center" } }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end"> cm</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid container padding={2} spacing={2} justifyContent="center">
              {weight != 0 && emptyweight != 0 && height != 0 && (
                <Grid item xs={3}>
                  <PrintLabeLButton id={pallet_id} />
                </Grid>
              )}
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    onSubmit();
                  }}
                >
                  SAVE DATA
                </Button>
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <>
                <SinglePalletItemsList
                  pallet_id={params_pallet_id}
                />
              </>
            </Box>
          </div>
        </Container>
      </Box>
    </>
  );
}
