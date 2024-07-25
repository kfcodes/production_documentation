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

export default function ThisWayUpLabels() {
  const [qty, setQty] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setQty();
  };

  const onPrintLabels = () => {
    fetch(`${process.env.REACT_APP_API_URL3}/this_way_up/${qty}`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        },
      );

    return (
      <>
        <Button
          variant="contained"
          color="primary"
          size="Large"
          onClick={handleOpen}
        >
          PRINT THIS WAY UP LABELS
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Container align="center" maxWidth="sm">
            <Box sx={style}>
              <Grid container align="center" spacing={3}>
                <>
                  <Grid align="center" item xs={6} md={8}>
                    <Typography
                      align="center"
                      id="modal-modal-title"
                      variant="h4"
                      component="h2"
                    >
                      QUANTITY OF LABELS REQUIRED
                    </Typography>
                  </Grid>
                  <Grid align="center" item xs={6} md={8}>
                    <TextField
                      label="NUMBER OF LABELS REQUIRED"
                      type="number"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    />
                  </Grid>
                  <br />
                  <Grid align="center" item xs={6} md={8}>
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
                    </Container>
                  </Grid>
                </>
              </Grid>
            </Box>
          </Container>
        </Modal>
      </>
    );
  };
}
