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

export default function FinsishedProduct() {
  const [productId, setProductId] = useState("");
  const [productDescription, setProductDescription] = useState();
  const [lot, setLot] = useState("");
  const [bbe, setBbe] = useState("");
  const [batch, setBatch] = useState("");
  const [useId, setUseId] = useState();
  const [no, setNo] = useState();
  const [qty, setQty] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmitId = () => {
    fetch(`${process.env.REACT_APP_API_URL}/label_info/${productId}`).then(
      (res) => {
        if (res.status == 200) {
          fetch(`${process.env.REACT_APP_API_URL}/product/${productId}`)
            .then((res) => res.json())
            .then(
              (result) => {
                setProductDescription(result.product_description);
              },
              (error) => {
                console.log(error);
              }
            );
        } else {
          setNo("No Lable found");
          return;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const onSubmitData = () => {
    let finishedProduct = {
      eol_product_id: productId,
      eol_lot: lot,
      eol_bbe: bbe,
      eol_batch: batch,
    };
    fetch(`${process.env.REACT_APP_API_URL}/finished_product/`, {
      method: "post",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finishedProduct),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUseId(result["LAST_INSERT_ID()"]);
      });
  };

  const onPrintLabels = () => {
    console.log(useId);
    let newnumber = { qty: qty };
    fetch(`${process.env.REACT_APP_API_URL}/box_label/${useId}`, {
      method: "post",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newnumber),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <>
      <Button variant="contained" color="primary" size="Large" onClick={handleOpen}>PRINT BOX LABELS</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container align="center" maxWidth="sm">
          <Box sx={style}>
            <Grid container align="center" spacing={3}>
              {no && (
                <>
                  <Typography
                    align="center"
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    THERE IS NO LABEL DATA FOR {productId}
                  </Typography>
                </>
              )}
              {!productDescription && !useId && !no && (
                <>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Enter Product ID
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
                            onSubmitId();
                          }}
                        >
                          Save
                        </Button>
                      </Container>
                    </Grid>
                  </Grid>
                </>
              )}
              {productDescription && !useId && !no && (
                <>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    {productDescription}
                  </Typography>
                  <hr />
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
                </>
              )}
              {useId && productDescription && !no && (
                <>
                  <Typography
                    align="center"
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    {productDescription}
                  </Typography>
                  <hr />
                  <Typography
                    align="center"
                    id="modal-modal-title"
                    variant="p"
                    component="p"
                  >
                    LOT: {lot}
                  </Typography>
                  <hr />
                  <Typography
                    align="center"
                    id="modal-modal-title"
                    variant="p"
                    component="p"
                  >
                    BBE: {bbe}
                  </Typography>
                  <hr />
                  <Typography
                    align="center"
                    id="modal-modal-title"
                    variant="p"
                    component="p"
                  >
                    BATCH: {batch}
                  </Typography>
                  <hr />
                  <br />
                  <Grid align="center" item xs={6} md={8}>
                    <TextField
                      label="Quantity"
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
              )}
            </Grid>
          </Box>
        </Container>
      </Modal>
    </>
  );
}
