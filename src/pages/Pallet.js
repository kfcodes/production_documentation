// import { useForm } from "react-hook-form";
import { Outlet, useNavigate, redirect } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
import PrintLabeLButton from "./print_pallet_label_button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function SinglePallet() {

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

  return (
      <div>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
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
          </div>
        </Box>
      </div>
  );
}
