// import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";
import IndividualPalletItem from "./each_pallet_item";
import Button from "@mui/material/Button";
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
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function CreatePallet() {
  const palletId = useOutletContext();
  const [palletItems, setPalletItems] = useState([]);
  const [newPalletItems, setNewPalletItems] = useState([]);

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
      setNewPalletItems(result);
    });
  };

  return (
    <>
            <h1>Products on the pallet</h1>
        {palletItems.map((product) => (
          <>
          <p> {product}</p>
          </>
        ))}
    </>
  );
}
