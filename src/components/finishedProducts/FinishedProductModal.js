// import { useForm } from "react-hook-form";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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

const createEol = (id) => {
  // This code should hit the api and put the product in the db and create the id passing in the user data
  console.log(id);
};

const printBoxLabel = (id) => {
  fetch(`${process.env.REACT_APP_API_URL}/box_label/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => {
    console.log(response);
  });
};

export default function Eol(props) {
  // const { register, handleSubmit, setValue } = useForm();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [productCode, setProductCode] = useState("PBN5000");
  const [customerPO, setCustomerPO] = useState("This is the Customer PO");
  const [lot, setLot] = useState("");
  const [bbe, setBbe] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [productId, setProductId] = useState("");
  const [propsProductId, setPropsProductId] = useState(props.productId);
  const [eolId, setEolId] = useState(props.eolId);
  // const [productId] = useState("pbn5000");
  const [po, setPo] = useState("");
  const [propsPo, setPropsPo] = useState(props.po);
  // const [po] = useState("1");
  const palletId = useParams();
  const pId = palletId["palletid"];

  // Get the EOL details and add them to the state
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_URL}/eol/${eolId}`)
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         setLot(result[0].lot);
  //         setBbe(result[0].bbe);
  //         setQuantity(result[0].quantity);
  //         setProductId(result[0].productId);
  //         setEolId(result[0].eolId);
  //         setPo(result[0].po);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }, []);

  console.log("Props");
  console.log(props.po);
  console.log(po);
  console.log("product ID");
  console.log(props.productId);
  console.log(productId);
  console.log("EOL");
  console.log(props.eolId);
  console.log(eolId);

  // Get the details for the pallet
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_URL}/pallet/${pId}`)
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         setPallet_id(result[0].pallet_id);
  //         setPalletType(result[0].pallet_type);
  //         setEmptyweight(result[0].empty_weight);
  //         setWeight(result[0].weight);
  //         setHeight(result[0].height);
  //         setPacking_list(result[0].packing_list);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }, []);

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
  // <Box sx={{ flexGrow: 1 }}>
  //
  //   <Button
  // onClick={handleOpen}>
  // End Of line Data
  // </Button>

  if (eolId) {
    return (
      <>
        <Button onClick={handleOpen}>End Of line Data</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Container maxWidth="sm">
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Enter End of Line Data
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                  <TextField
                    disabled
                    label="PRODUCT CODE"
                    type="text"
                    value={productId}
                    sx={{ m: 1, width: "25ch" }}
                  />
                </Grid>

                <Grid item xs={6} md={8}>
                  <TextField
                    disabled
                    label="CUSTOMER PO"
                    type="text"
                    value={po}
                    sx={{ m: 1, width: "25ch" }}
                  />
                </Grid>
                <Grid item xs={6} md={8}>
                  <TextField
                    label="LOT"
                    type="text"
                    value={lot}
                    onChange={(e) => setLot(e.target.value)}
                    sx={{ m: 1, width: "25ch" }}
                  />
                </Grid>
                <Grid item xs={6} md={8}>
                  <TextField
                    label="BBE"
                    type="text"
                    value={bbe}
                    onChange={(e) => setBbe(e.target.value)}
                    sx={{ m: 1, width: "25ch" }}
                  />
                </Grid>
                <Grid item xs={6} md={8}>
                  <TextField
                    label="Total Quantity Produced"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    sx={{ m: 1, width: "25ch" }}
                  />
                </Grid>
                <Grid item xs={6} md={8}>
                  <Container maxWidth="sm">
                    <Button
                      variant="contained"
                      color="primary"
                      size="Large"
                      onClick={() => {
                        // onSubmit();
                        console.log("pressed the button");
                      }}
                    >
                      Save End of Line Sheet Details
                    </Button>
                    <Button onClick={() => printBoxLabel(eolId)}>
                      Print Box Label
                    </Button>
                  </Container>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Modal>
      </>
    );
  }
  return (
    <>
      <Button onClick={createEol}>Create EOL Data</Button>
    </>
  );
}
