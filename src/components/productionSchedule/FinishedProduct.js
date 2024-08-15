import { Outlet, useNavigate, redirect } from "react-router-dom";
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

const style = {
  width: "100%",
  border: "none",
  bgcolor: "#04AA6D",
  color: "white",
  padding: "14px 28px",
  FontFace: "26px",
  cursor: "pointer",
  display: "flex",
};

export default function FinishedProduct() {
  const id = useParams();
  const uid = id["palletid"];
  const [product_id, setproduct_id] = useState();
  const [productDescription, setproductDescription] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/production/${uid}`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        },
      );
  }, []);

  // const onSubmit = () => {
  //   let palletData = {
  //     pallet_type: palletType,
  //     empty_weight: emptyweight,
  //     weight: weight,
  //     height: height,
  //     packing_list: packing_list,
  //   };
  //   console.log(palletData);
  //   fetch(`${process.env.REACT_APP_API_URL}/pallet/${pallet_id}`, {
  //     method: "put",
  //     mode: "cors",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(palletData),
  //   }).then((res) => res.json());
  // };

  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Container>
          <Grid container padding={1} spacing={1} justifyContent="center">
            <Grid item>
              <h1>Product</h1>
            </Grid>
          </Grid>
          <div>
            <Grid container padding={2} spacing={2} justifyContent="center">
              <Grid item xs={8} sOffset={3}>
                <TextField
                  fullWidth
                  disabled
                  value={uid}
                  id="outlined-adornment-amount"
                  label="id"
                />
              </Grid>
            </Grid>
          </div>
        </Container>
      </Box>
    </>
  );
}
