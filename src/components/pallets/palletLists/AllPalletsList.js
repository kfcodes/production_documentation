import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
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
import ExportPalletData from "../buttons/ExportPalletDataButton";
import CreateNewPalletButton from "../buttons/CreateNewPalletButton";

function PalletList() {
  const [pallets, setPallets] = useState([]);
  const [palletItems, setPalletItems] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL2}/all_pallets/`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPallets(result);
        },
        (error) => {
          console.log(error);
        },
      );
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL2}/all_pallet_items/`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPalletItems(result);
        },
        (error) => {
          console.log(error);
        },
      );
  }, []);

  return (
    <>
      <Box component="span" sx={{ p: 2, border: "1px dashed grey" }}>
        <Header />
        <Container>
          <Grid container padding={2} spacing={3} justifyContent="center">
            <Grid item alignItems="center">
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={4}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <ExportPalletData />
                <CreateNewPalletButton />
              </Stack>
            </Grid>
          </Grid>
        </Container>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                  >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
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
                    <Button
                      variant="outlined"
                      size="small"
                      color="secondary"
                      href={`/pallet/${pallet.pallet_id}/pallet_item/`}
                    >
                      Change pallet Details
                    </Button>
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
      </Box>
    </>
  );
}

export default PalletList;
