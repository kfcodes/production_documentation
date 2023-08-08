import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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

export default function FinsishedProduct(props) {
  const [eolId] = useState(props.eolId);
  const [productId, setProductId] = useState("");
  const [po, setPo] = useState("");
  const [lot, setLot] = useState("");
  const [bbe, setBbe] = useState("");
  const [quantity, setQuantity] = useState(0);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Get the EOL details and add them to the state
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/eol/${eolId}`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setProductId(result[0].eol_product_id);
          setPo(result[0].eol_po);
          setLot(result[0].eol_lot);
          setBbe(result[0].eol_bbe);
          setQuantity(result[0].eol_quantity);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const onSubmit = (id) => {
    let eol = {
      po: po,
      product_id: productId,
      lot: lot,
      bbe: bbe,
      quantity: quantity,
    };
    fetch(`${process.env.REACT_APP_API_URL}/eol/${id}`, {
      method: "put",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eol),
    });
    // .then((res) => res.json());
    props.setUpdate(`${productId}${lot}${bbe}`);
    handleClose();
  };

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
                />
              </Grid>

              <Grid item xs={6} md={8}>
                <TextField
                  disabled
                  label="INTERNAL PO CODE"
                  type="text"
                  value={po}
                />
              </Grid>
              <Grid item xs={6} md={8}>
                <TextField
                  label="LOT"
                  type="text"
                  value={lot}
                  onChange={(e) => setLot(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} md={8}>
                <TextField
                  label="BBE"
                  type="text"
                  value={bbe}
                  onChange={(e) => setBbe(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} md={8}>
                <TextField
                  label="Total Quantity Produced"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} md={8}>
                <Container maxWidth="sm">
                  <Button
                    variant="contained"
                    color="primary"
                    size="Large"
                    onClick={() => {
                      onSubmit(eolId);
                    }}
                  >
                    Update the EOL Data
                  </Button>
                  <br />
                </Container>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Modal>
    </>
  );
}
// <PrintBoxLabel eolId={eolId} />

// <Button onClick={() => printBoxLabel(eolId)}>
//   Print Box Label
// </Button>
