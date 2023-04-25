// import { useForm } from "react-hook-form";
import { Outlet, useNavigate, redirect, Navigate } from "react-router-dom";
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
import setMpsData from "./mps";

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

export default function CreateEol(props) {
  const [productId] = useState(props.productId);
  const [po] = useState(props.po);
  const [lot, setLot] = useState("");
  const [bbe, setBbe] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // function navigate1(p) {
  //   console.log(p);
  // navigate(`/pallet/${p}/pallet_item/`);
  // }


  return (
    <>
      <Button onClick={handleOpen}>create EOL Data</Button>
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
                <Container maxWidth="sm">
                  <Button
                    variant="contained"
                    color="primary"
                    size="Large"
                  >
                    Save End of Line Sheet Details
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
