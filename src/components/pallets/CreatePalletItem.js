// import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";
import IndividualPalletItem from "./EachPalletItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
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
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CreatePallet() {
  const palletId = useOutletContext();
  const [palletItems, setPalletItems] = useState([]);
  const [newPalletItems, setNewPalletItems] = useState([]);

  const createNewPalletItem = (pallet) => {
    let palletItemData = {
      pallet_item_pallet_id: pallet,
    };
    fetch(`${process.env.REACT_APP_API_URL}/pallet_item/${pallet}`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(palletItemData),
    }).then((result) => {
      setNewPalletItems(result);
      // getPalletProducts())
    });
  };

  // .then(
  const printState = () => {
    console.log("These are the pallet items");
    console.log(palletItems);
  };

  const getPalletProducts = () => {
    fetch(`${process.env.REACT_APP_API_URL}/pallet_items/${palletId}`)
      .then((response) => response.json())
      .then((result) => {
        setPalletItems(result);
        console.log("The state should be updated");
        // console.log(result)
      });
  };

  const deletePalletItem = (item_id) => {
    fetch(`${process.env.REACT_APP_API_URL}/pallet_item/${item_id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((result) => {
      setNewPalletItems(result);
    });
  };
  //   }).then((response) => {
  //     console.log(response);
  //   });
  // };

  // fetch(`${process.env.REACT_APP_API_URL}/pallet_items/${palletId}`)
  //   .then((res) => res.json())
  //   .then(
  //     (result) => {
  //       setPalletItems(result);
  //       console.log("These are the pallet items");
  //       console.log(result);
  // },
  // (error) => {
  //   console.log(error);
  // }

  useEffect(() => {
    console.log("The UseEffect Is being called");
    //       getPalletProducts();
    // fetch(`
    // ${process.env.REACT_APP_API_URL}/pallet_items/${palletId}`
    // )
    //   .then(response => response.json())
    //   .then(result => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/pallet_items/${palletId}`
      );
      const result = await response.json();
      setPalletItems(result);
      console.log("The state should be updated");
    };
    fetchData();
    // });
    // }, []);
    // }, [palletItems]);
  }, [newPalletItems]);
  // }, [props.id]);
  // console.log(result)
  //   })
  // },
  //     (error) => {
  //       console.log(error);
  // });
  // }, [palletItems]);
  // }, []);

  // item_id: event.target[0].value,
  // pallet_item_product_id: event.target[1].value,
  // lot: event.target[2].value,
  const onSubmit = (event) => {
    // console.log("This is the event");
    // console.log("This is the item ID");
    // console.log(event);
    // console.log(event.target.item_id);
    event.preventDefault();
    let palletItemData = {
      pallet_item_pallet_id: palletId[0],
      item_id: event.target.item_id.value,
      pallet_item_product_id: event.target.product_id.value,
      quantity: event.target.quantity.value,
      lot: event.target.lot.value,
      bbe: event.target.bbe.value,
      batch: event.target.batch.value,
    };
    // console.log("This is the pallet Item Data");
    console.log(palletItemData);
    fetch(
      `${process.env.REACT_APP_API_URL}/pallet_item/${palletItemData.item_id}`,
      {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(palletItemData),
      }
    ).then((result) => {
      setNewPalletItems(result);
    });
  };

  // );
  // .then((response) => {
  //     console.log(response);
  //   });
  // };

  // console.log("These are the pallet items");
  // console.log(palletItems.length);
  // console.log(palletItems);
  // <h1>DETAILS FOR THE PRODUCTS ON THE PALLET {palletId}</h1>
  // <ul>
  //   {palletItems.map((product) => (
  //     <li key={product.item_id}>
  //       <>
  //         <form onSubmit={onSubmit}>
  //           <label>
  //             <input type="hidden" value={product.pallet_item_pallet_id} />
  //           </label>
  //           <label>
  //             Product ID
  //             <br />
  //             <input type="text" value={product.pallet_item_product_id} />
  //           </label>
  //           <br />
  //           <label>
  //             Lot
  //             <br />
  //             <input type="text" value={product.lot} />
  //           </label>
  //           <br />
  //           <label>
  //             BBE
  //             <br />
  //             <input type="text" value={product.bbe} />
  //           </label>
  //           <br />
  //           <label>
  //             Batch
  //             <br />
  //             <input type="text" value={product.batch} />
  //           </label>
  //           <br />
  //           <label>
  //             Quantity
  //             <br />
  //             <input type="number" value={product.quantity} />
  //           </label>
  //           <label>
  //             <input type="hidden" value={product.item_id} />
  //           </label>
  //           <button type="submit">Submit</button>
  //         </form>
  //         <button onClick={() => deletePalletItem(product.item_id)}>
  //           Delete Pallet Item
  //         </button>
  //       </>
  //     </li>
  //   ))}
  // </ul>
  // <button onClick={() =>
  // createNewPalletItem(palletId)
  // }>
  //   Create New Pallet Item
  // </button>

  // The Buttons for removing the details
  //         <Button variant="contained"
  // onClick={() => {
  //               deletePalletItem(product.item_id);
  // }}
  //   >
  //         Submit Product Information
  //       </Button>
  //         <Button variant="contained"
  // onClick={() => {
  //               deletePalletItem(product.item_id);
  // }}
  //   >
  //         Delete Product
  //       </Button>
  // <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
  //
  //
  //

  //   <input type="hidden" value={product.item_id} />
  //   <TextField
  //     label="Product ID"
  //     id="outlined-end-adornment"
  //     type="text"
  //     value={product.pallet_item_product_id}
  //     sx={{ m: 1, width: "25ch" }}
  //   />
  //   <TextField
  //     label="LOT"
  //     id="outlined-end-adornment"
  //     type="text"
  //     value={product.lot}
  //     sx={{ m: 1, width: "25ch" }}
  //   />
  //   <TextField
  //     label="BBE"
  //     id="outlined-end-adornment"
  //     type="text"
  //     value={product.bbe}
  //     sx={{ m: 1, width: "25ch" }}
  //   />
  //   <TextField
  //     label="Batch"
  //     id="outlined-end-adornment"
  //     type="text"
  //     value={product.batch}
  //     sx={{ m: 1, width: "25ch" }}
  //   />
  //   <TextField
  //     label="Quantity"
  //     id="outlined-end-adornment"
  //     type="number"
  //     value={product.quantity}
  //     sx={{ m: 1, width: "25ch" }}
  //   />
  //
  //   <Button
  // type="submit"
  // variant="contained"
  // >
  // Save Product Details
  //   </Button>

  // <label>
  //   <input type="hidden" value={product.item_id} />
  // </label>
  //
  // <TextField
  //     label="Quantity"
  //     type="number"
  //     value={product.quantity}
  //     sx={{ m: 1, width: "25ch" }}
  // />
  // sx={{ m: 1, width: "25ch" }}
  // <input
  //   id="item_id"
  //   name="item_id"
  //   type="hidden"
  //   value={product.item_id}
  // />
  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <Container>
    <div>
        <Grid container padding={1} spacing={1} justifyContent="center">
          <Grid item >
            <h1>PALLET ITEMS</h1>
          </Grid>
        </Grid>
    </div>
      </Container>
      </Box >
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {palletItems.map((product) => (
          <>
            <Container>
              <Card variant="outlined">
                <CardContent>
                  <form onSubmit={onSubmit}>
                    <input
                      id="item_id"
                      name="item_id"
                      type="hidden"
                      value={product.item_id}
                    />
                    <Grid
                      container
                      padding={1}
                      spacing={1}
                      justifyContent="center"
                    >
    {product.product_description != null && 
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          type="text"
                          disabled="true"
                          id="product_description"
                          name="product_description"
                          value={product.product_description}
                          inputProps={{ style: { textAlign: "center" } }}
                        />
                      </Grid>
    }  
                    </Grid>
                    <Grid
                      container
                      padding={1}
                      spacing={1}
                      justifyContent="center"
                    >
                      <Grid item xs={7}>
                        <TextField
                          fullWidth
                          label="Product ID"
                          type="text"
                          id="product_id"
                          name="product_id"
                          value={product.pallet_item_product_id}
                          inputProps={{ style: { textAlign: "center" } }}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          fullWidth
                          label="Quantity"
                          type="number"
                          id="quantity"
                          name="quantity"
                          value={product.quantity}
                          inputProps={{ style: { textAlign: "center" } }}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      padding={1}
                      spacing={1}
                      justifyContent="center"
                    >
                      <Grid item xs={4}>
                        <TextField
                          fullWidth
                          label="Lot"
                          type="text"
                          id="lot"
                          name="lot"
                          value={product.lot}
                          inputProps={{ style: { textAlign: "center" } }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          fullWidth
                          label="BBE"
                          type="text"
                          id="bbe"
                          name="bbe"
                          value={product.bbe}
                          inputProps={{ style: { textAlign: "center" } }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          fullWidth
                          label="Batch"
                          type="text"
                          id="batch"
                          name="batch"
                          value={product.batch}
                          inputProps={{ style: { textAlign: "center" } }}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      padding={1}
                      spacing={1}
                      justifyContent="center"
                    >
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Delete Button</Typography>
        </AccordionSummary>
        <AccordionDetails>
                      <Grid xs={6}>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => {
                            deletePalletItem(product.item_id);
                          }}
                        >
                          DELETE
                        </Button>
                      </Grid>
        </AccordionDetails>
      </Accordion>
                      <Grid xs={4}> <Button
                          type="submit"
                          variant="contained"
                          color="secondary"
                          size="large"
          sx={{ marginLeft: "auto" }}
                        >
                          SAVE
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Container>
          </>
        ))}
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <Container>
        <Grid container padding={10} spacing={10} justifyContent="center">
          <Grid>
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                createNewPalletItem(palletId);
              }}
            >
              ADD PRODUCT TO PALLET
            </Button>
          </Grid>
        </Grid>
    </Container>
      </Box>
    </>
  );
}
