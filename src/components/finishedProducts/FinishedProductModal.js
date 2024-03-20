import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
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

const createEol = (id) => {
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
  const [po, setPo] = useState("");
  const [propsPo, setPropsPo] = useState(props.po);
  const palletId = useParams();
  const pId = palletId["palletid"];

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
