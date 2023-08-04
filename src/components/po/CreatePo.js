import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// const printPalletLabel = (id) => {
//   console.log(id);
//   fetch(`${process.env.REACT_APP_API_URL}/label/${id}`, {
//     method: "get",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   }).then((response) => {
//     console.log(response);
//   });
// };
//
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

// export default function PrintBoxLabel(props) {
export default function Po() {
  // const [eolId] = useState(props.eolId);
  // const [batch, setBatch] = useState("");
  // const [quantity, setQuantity] = useState(0);
  const [poCode, setPoCode] = useState(0);
  const [customerCode, setCustomerCode] = useState("");

  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // Get the EOL details and add them to the state
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_URL}/eol/${eolId}`)
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         console.log(result);
  //         setProductId(result[0].product_id);
  //         setPo(result[0].po);
  //         setLot(result[0].lot);
  //         setBbe(result[0].bbe);
  //         setQuantity(result[0].quantity);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }, []);

  const onSubmit = () => {
      let po = {
    po: poCode,
    customerCode: customerCode,
      };
    // console.log(label);
    fetch(`${process.env.REACT_APP_API_URL}/po/`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(po),
    });
    // handleClose();
  };

  // <Button onClick={handleOpen}>Print Box Labels</Button>
  // <Modal
  //   open={open}
  //   onClose={handleClose}
  //   aria-labelledby="modal-modal-title"
  //   aria-describedby="modal-modal-description"
  // >
  //
  //
  // </Modal>
  // <Box sx={style}>
  //
  return (
    <>
      <Container maxWidth="sm">
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter The Purchase Order Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} md={8}>
              <TextField
                label="PO CODE"
                type="number"
                value={poCode}
                onChange={(e) => setPoCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={8}>
              <TextField
                label="CUSTOMER CODE"
                type="text"
                value={customerCode}
                onChange={(e) => setCustomerCode(e.target.value)}
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
                SUBMIT THE PO DATA
                </Button>
              </Container>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
