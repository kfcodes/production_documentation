import { Outlet, useNavigate, redirect } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PrintLabeLButton from "./print_pallet_label_button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
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
import { __esModule } from "quagga";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// const printPalletLabel = (id) => {
//   console.log(id);
//   fetch(`${process.env.REACT_APP_API_URL}/label/${id}`, {
//     method: "get",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   }).then((response) => {
//     console.log(response);
//   });
// };
//
// const printBoxLabel = (id) => {
//   fetch(`${process.env.REACT_APP_API_URL}/box_label/${id}`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   }).then((response) => {
//     console.log(response);
//   });
// };

// export default function PrintBoxLabel(props) {
export default function DumpSqlData() {
  // const [eolId] = useState(props.eolId);
  // const [batch, setBatch] = useState("");
  // const [quantity, setQuantity] = useState(0);
  const [palletId, setPalletId] = useState(0);

  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // Get the EOL details and add them to the state
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_URL}/eol/${eolId}`)
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         console.log(result);
  //         setProductId(result[0].product_id);
  //         setPo(result[0].po);
  //         setLot(result[0].lot);
  //         setBbe(result[0].bbe);
  //         setQuantity(result[0].quantity);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }, []);

  const onSubmit = () => {
    //   let pallet = {
    // palletId: palletId,
    //   };
    // console.log(label);
    fetch(`${process.env.REACT_APP_API_URL}/dump/${palletId}`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(pallet),
    });
    // handleClose();
  };
  return (
    <>
      <Container maxWidth="sm">
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter The most recent pallet ID
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} md={8}>
              <TextField
                label="Pallet ID"
                type="number"
                value={palletId}
                onChange={(e) => setPalletId(e.target.value)}
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
                  DUMP THE SQL DATA
                </Button>
              </Container>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
