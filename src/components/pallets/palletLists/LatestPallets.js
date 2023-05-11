import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Header from "../../header/Header.js";
import CreateNewPalletButton from "../buttons/CreateNewPalletButton";
import TextField from "@mui/material/TextField";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

function LatestPallets() {
  const [pallets, setPallets] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/latest_pallet_data/`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPallets(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  console.log(pallets);

  const listItems = pallets.map((pallet) => (
     <Card>
      <CardActionArea>
        <CardContent>
      <Grid container padding={2} spacing={3} justifyContent="center">
            <Grid item xs={4}>
          <Typography gutterBottom variant="h5" component="div" align="center" fontWeight="bold">
    {pallet.PALLET}
          </Typography>
            </Grid >
            <Grid item xs={4}>
          <Typography gutterBottom variant="body1" component="div" align="center" >
    {pallet.DIMENSIONS}
          </Typography>
            </Grid >
            <Grid item xs={4}>
          <Typography gutterBottom variant="body1" component="div" align="center" >
    {pallet.WEIGHT}
          </Typography>
            </Grid >
            <Grid item xs={4}>
          <Typography variant="body2" color="text.secondary">
    {pallet.ID}
          </Typography>
            </Grid >
            <Grid item xs={8}>
          <Typography variant="body2" color="text.secondary">
    {pallet.DESCRIPTION}
          </Typography>
            </Grid >
            <Grid item xs={3}>
          <Typography variant="body2" color="text.secondary">
            {pallet.LOT_BBE}
          </Typography>
            </Grid >
            <Grid item xs={3}>
          <Typography variant="body2" color="text.secondary">
            {pallet.BATCH}
          </Typography>
            </Grid >
            <Grid item xs={3}>
          <Typography variant="body2" color="text.secondary">
            {pallet.QTY}
          </Typography>
            </Grid >
    </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
    ));

    // <TableRow
    //   sx={{ "& > *": { borderBottom: "unset" } }} key={pallet.PALLET} > <TableCell> {pallet.ID} </TableCell> <TableCell > {pallet.DESCRIPTION} </TableCell> <TableCell align="center">
    //     {pallet.LOT_BBE}
    //   </TableCell>
    //   <TableCell align="center">{pallet.BATCH} kg</TableCell>
    //   <TableCell align="center">{pallet.QUANTITY} cm</TableCell>
    //   <TableCell> {pallet.DIMENSIONS} </TableCell>
    //   <TableCell> {pallet.WEIGHT} </TableCell>
    //   <TableCell> {pallet.PALLET} </TableCell>
    //   </TableRow>
    // ));
  
    // {pallet.HEIGHT ? (
    //   <Button
    //     variant="outlined"
    //     size="small"
    //     color="secondary"
    //     href={`/pallet/${pallet.pallet_id}/pallet_item/`}
    //   >
    //     Change pallet Details
    //   </Button>

  return (
    <>
      <Header />
    <Container>
    {listItems}
    </Container>
    </>
  );
}

// {pallets.map((pallet) => (
//   <>
//     <TableRow
//       sx={{ "& > *": { borderBottom: "unset" } }}
//       key={pallet.pallet_id}
//     >
//       <TableCell />
//       <TableCell component="th" scope="row">
//         {pallet.pallet_id}
//       </TableCell>
//       <TableCell align="center">
//         {pallet.pallet_type_letter}
//       </TableCell>
//       <TableCell align="center">{pallet.weight} kg</TableCell>
//       <TableCell align="center">{pallet.height} cm</TableCell>
//       <Button
//         variant="outlined"
//         size="small"
//         color="secondary"
//         href={`/pallet/${pallet.pallet_id}/pallet_item/`}
//       >
//         Change pallet Details
//       </Button>
//                 {palletItems.map((item) => (
//                   <>
//                     {pallet.pallet_id ===
//                       item.pallet_item_pallet_id && (
//                       <TableRow key={item.pallet_item_pallet_id}>
//                         <TableCell component="th" scope="row">
//                           {item.product_description}
//                         </TableCell>
//                         <TableCell align="right">
//                           {item.lot}
//                         </TableCell>
//                         <TableCell align="right">
//                           {item.bbe}
//                         </TableCell>
//                         <TableCell align="right">
//                           {item.quantity}
//                         </TableCell>
//                       </TableRow>
//                     )}
//                   </>
//                 ))}
//               </TableBody>

export default LatestPallets;
