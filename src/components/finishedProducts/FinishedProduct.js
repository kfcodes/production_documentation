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

export default function FinsishedProduct(props) {
  const [productId, setProductId] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [lot, setLot] = useState("");
  const [bbe, setBbe] = useState("");
  const [batch, setBatch] = useState("");

  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmitId = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/product/${id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result.product_description)
          setProductDescription(result.product_description);
        },
        (error) => {
          console.log(error);
        }
      );
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
                  label="PRODUCT ID"
                  type="text"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} md={8}>
                <Container maxWidth="sm">
                  <Button
                    variant="contained"
                    color="primary"
                    size="Large"
                    onClick={() => {
                      onSubmitId(productId);
                    }}
                  >
    CREATE LABELS FOR THIS PRODUCT
                  </Button>
                </Container>
              </Grid>

            <Typography id="modal-modal-title" variant="h6" component="h2">
    {productDescription}
            </Typography>
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
                  label="BATCH"
                  type="text"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} md={8}>
                <Container maxWidth="sm">
                  <Button
                    variant="contained"
                    color="primary"
                    size="Large"
                    onClick={() => {
                      onSubmitData();
                    }}
                  >
    SAVE LABEL DATA
                  </Button>
                </Container>
              </Grid>

            <Typography id="modal-modal-title" variant="h6" component="h2">
    {productDescription}{lot}{bbe}{batch}
            </Typography>
              <Grid item xs={6} md={8}>
                <TextField
                  label="Quantity"
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                />
              </Grid>

              <Grid item xs={6} md={8}>
                <Container maxWidth="sm">
                  <Button
                    variant="contained"
                    color="primary"
                    size="Large"
                    onClick={() => {
                      onPrintLabels();
                    }}
                  >
    PRINT LABELS
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
