import React, { useState } from "react";
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

export default function PrintBoxLabel(props) {
  const [eolId] = useState(props.eolId);
  const [batch, setBatch] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (eol_id) => {
    let label = {
      batch: batch,
      label_quantity: quantity,
    };
    fetch(`${process.env.REACT_APP_API_URL}/box_label/${eolId}`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(label),
    });
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen}>Print Box Labels</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container maxWidth="sm">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enter Label data
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} md={8}>
                <TextField
                  label="Batch"
                  type="text"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} md={8}>
                <TextField
                  label="Quantity of Labels"
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
                    PRINT LABELS
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
