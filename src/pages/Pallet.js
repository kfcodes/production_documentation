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
  const palletId = useParams();
  const pId = palletId["palletid"];

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
          </div>
        </Box>
      </div>
  );
}
