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


export default function CreateEol(props) {
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
          <Box >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enter End of Line Data
            </Typography>
          </Box>
        </Container>
      </Modal>
    </>
  );
}
