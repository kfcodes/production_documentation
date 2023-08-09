import React, { useState, forwardRef, useImperativeHandle } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./EnterHeightMenu.css";

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

const EnterPalletHeightMenu = forwardRef((props, _ref, get ) => {
  const [height, setHeight] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = () => {
    // console.log(height)
    get();
  };

  useImperativeHandle(_ref, () => ({
    getChildCount: () => {
      return height;
    },
  }));

  return (
    <>
      <Button
        fullWidth
        size="large"
        color="primary"
        variant="outlined"
        sx={{ width: 200, padding: 1, margin: 2 }}
        onClick={handleOpen}
      >
        Enter Pallet Height
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container maxWidth="sm">
          <Box sx={style}>
            <br />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              ENTER PALLET HEIGHT (cm)
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <TextField
                  label="HEIGHT"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
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
                    SUBMIT
                  </Button>
                </Container>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Modal>
    </>
  );
})

export default React.memo(EnterPalletHeightMenu);
