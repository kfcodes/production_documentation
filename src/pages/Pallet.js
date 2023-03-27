// import { useForm } from "react-hook-form";
import { Outlet, useNavigate, redirect } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PrintLabeLButton from "./print_pallet_label_button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Container from "@mui/material/Container";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

const printPalletLabel = (id) => {
  console.log(id);
  fetch(`${process.env.REACT_APP_API_URL}/label/${id}`, {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => {
    console.log(response);
  });
};

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

export default function SinglePallet() {
  // const { register, handleSubmit, setValue } = useForm();
  const [pallet, setPallet] = useState({});
  const [pallet_id, setPallet_id] = useState(0);
  const [palletType, setPalletType] = useState(0);
  const [emptyweight, setEmptyweight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [packing_list, setPacking_list] = useState(0);
  const palletId = useParams();
  const pId = palletId["palletid"];

  // Get the details for the pallet
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/pallet/${pId}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPallet_id(result[0].pallet_id);
          setPalletType(result[0].pallet_type);
          setEmptyweight(result[0].empty_weight);
          setWeight(result[0].weight);
          setHeight(result[0].height);
          setPacking_list(result[0].packing_list);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  // useEffect(() => {
  //   // console.log(pallet);
  //   console.log(empty_weight);
  //   // setValue({"empty_weight": 0});
  // }, []);
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_URL}/pallet/`, {
  //     method: "post",
  //     mode: "cors",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(),
  //   }).then((res) => res.json()).then(
  //       (result) => {
  //         console.log(result["LAST_INSERT_ID()"]);
  //         setPalletID(result["LAST_INSERT_ID()"]);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }, []);
  // (result) => {
  //   let r = result.json();
  //   let id = r["LAST_INSERT_ID"];
  //   setPalletID(id);
  //   console.log(r);
  //   console.log(id);
  //   console.log(palletId);
  //   },
  //   (error) => {
  //     console.log(error);
  //   }
  // );
  //
  // console.log(pallet.empty_weight);
  // console.log(event.target[0].value);
  // console.log(event.target[1].value);
  // console.log(event.target[2].value);
  // console.log(event.target[3].value);
  // console.log(event.target[4].value);
  // console.log(palletType);

  // Update the details for the pallet
  // const onSubmit = (event) => {
  //   event.preventDefault();
  //   let palletData = {
  //     pallet_type: event.target[0].value,
  //     empty_weight: event.target[1].value,
  //     weight: event.target[2].value,
  //     height: event.target[3].value,
  //     packing_list: event.target[4].value,
  //   };
  const onSubmit = () => {
    let palletData = {
      pallet_type: palletType,
      empty_weight: emptyweight,
      weight: weight,
      height: height,
      packing_list: packing_list,
    };
    console.log(palletData);
    fetch(`${process.env.REACT_APP_API_URL}/pallet/${pallet_id}`, {
      method: "put",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(palletData),
    }).then((res) => res.json());
  };
  // .then(navigate("/"));
  // console.log("The pallet data function was rendered");
  // <div>
  //       <button onClick={() => printPalletLabel(pId)}>
  //     Print Pallet Label
  //       </button>
  // </div>

  // Older Code

  // <h1>Pallet ID: {pId} </h1>
  // <form onSubmit={onSubmit}>
  //   <label>
  //     Pallet Type
  //     <br />
  //     <select>
  //       <option value="1">Big</option>
  //       <option value="2">Small</option>
  //       <option value="3">Euro</option>
  //     </select>
  //   </label>
  //   <br />
  //   <label>
  //     Empty Pallet Weight (kg)
  //     <br />
  //     <input
  //       type="number"
  //       value={emptyweight}
  //       onChange={(e) => setEmptyweight(e.target.value)}
  //     />
  //   </label>
  //   <br />
  //   <label>
  //     Full Pallet Weight (kg)
  //     <br />
  //     <input
  //       type="number"
  //       value={weight}
  //       onChange={(e) => setWeight(e.target.value)}
  //     />
  //   </label>
  //   <br />
  //   <label>
  //     Pallet Height (cm)
  //     <br />
  //     <input
  //       type="number"
  //       value={height}
  //       onChange={(e) => setHeight(e.target.value)}
  //     />
  //   </label>
  //   <br />
  //   <label>
  //     Packing list
  //     <br />
  //     <input
  //       type="number"
  //       value={packing_list}
  //       onChange={(e) => setPacking_list(e.target.value)}
  //     />
  //   </label>
  //   <br />
  //   <button type="submit">Submit</button>
  // </form>
  return (
    <>
      <Box component="span" sx={{ p: 2, border: "1px dashed grey" }}>
        <Grid container padding={2} spacing={1} justifyContent="center">
          <Grid item alignItems="center">
        <AppBar position="absolute" component="nav" color="primary">
          <Toolbar>
            <Container>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={4}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Button href="/" fullWidth size="large" color="warning" variant="contained" xs={style}>
                  PALLETS
                </Button>
                <Button href="/mps/" fullWidth size="large" color="warning" variant="contained">
                  PRODUCTION
                </Button>
              </Stack>
            </Container>
          </Toolbar>
        </AppBar>
          </Grid>
        </Grid>

      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <Container>
        <Grid container padding={1} spacing={1} justifyContent="center">
          <Grid item >
            <h1>PALLET {pallet_id} DATA</h1>
          </Grid>
        </Grid>
          <div>
            <Grid container padding={2} spacing={2} justifyContent="center">
              <Grid item xs={8} sOffset={3}>
                <TextField
                  fullWidth
                  disabled
                  value={pId}
                  id="outlined-adornment-amount"
                  label="pallet_id"
                />
              </Grid>
              </Grid>
            <Grid container padding={2} spacing={2} justifyContent="center">
              <Grid item sm={6}>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
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
                  id="outlined-end-adornment"
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
    {weight != 0 && emptyweight != 0 && height != 0 &&
              <Grid item xs={3}>
                <PrintLabeLButton id={pId} />
              </Grid>
    }
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
            <Outlet context={[pId]} />
          </div>
      </Container>
      </Box >
    </>
  );
}
