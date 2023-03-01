import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateNewPallet from "./create_pallet";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function PalletList() {
  const [pallets, setPallets] = useState([]);
  const [palletItems, setPalletItems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/pallet_items/`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPalletItems(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/pallets/`)
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

  return (
    <div className="wrapper">
      <h1>All pallets</h1>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Pallet Id</TableCell>
              <TableCell align="center">Pallet Type</TableCell>
              <TableCell align="center">Pallet Weight (kg)</TableCell>
              <TableCell align="center">Pallet Height (cm)</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {pallets.map((pallet) => (
              <>
                <TableRow
                  sx={{ "& > *": { borderBottom: "unset" } }}
                  key={pallet.pallet_id}
                >
                  <TableCell />
                  <TableCell component="th" scope="row">
                    {pallet.pallet_id}
                  </TableCell>
                  <TableCell align="center">
                    {pallet.pallet_type_letter}
                  </TableCell>
                  <TableCell align="center">{pallet.weight} kg</TableCell>
                  <TableCell align="center">{pallet.height} cm</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Table size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <TableCell>PRODUCT DESCRIPTION</TableCell>
                              <TableCell align="right">LOT</TableCell>
                              <TableCell align="right">BBE</TableCell>
                              <TableCell align="right">Quantity</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {palletItems.map((item) => (
                              <>
                                {pallet.pallet_id ===
                                  item.pallet_item_pallet_id && (
                                  <TableRow key={item.pallet_item_pallet_id}>
                                    <TableCell component="th" scope="row">
                                      {item.product_description}
                                    </TableCell>
                                    <TableCell align="right">
                                      {item.lot}
                                    </TableCell>
                                    <TableCell align="right">
                                      {item.bbe}
                                    </TableCell>
                                    <TableCell align="right">
                                      {item.quantity}
                                    </TableCell>
                                  </TableRow>
                                )}
                              </>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))}

          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}