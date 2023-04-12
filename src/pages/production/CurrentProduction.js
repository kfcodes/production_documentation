import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import Grid from "@mui/material/Unstable_Grid2";
import ListItem from "@mui/material/ListItem";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ButtonGroup from "@mui/material/ButtonGroup";
import Eol from "./eol";
import CreateEol from "./createEol";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

function Mps() {
  const [mps, setMps] = useState([]);
  const [update, setUpdate] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/mps`)
      .then((res) => res.json())
      .then(
        (result) => {
          setMps(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [update]);

  const navItems = [
    { title: "Pallets", key: "" },
    { title: "Full Production Schedule ", key: "full_mps" },
  ];

  return (
    <>
      <Box component="span" sx={{ p: 2, border: "1px dashed grey" }}>
        <Grid container padding={2} spacing={1} justifyContent="center">
          <Grid item alignItems="center">
        <AppBar position="absolute" component="nav" color="primary">
          <Toolbar>
            <Container>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={4}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Button href="/" fullWidth size="large" color="warning" variant="contained" >
                  PALLETS
                </Button>
                <Button href="/mps/" fullWidth size="large" color="warning" variant="contained">
                  PRODUCTION
                </Button>
              </Stack>
            </Container>
          </Toolbar>
        </AppBar>
          </Grid>
        </Grid>
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
          </Stack>
          </Grid>
        </Grid>
        </Container>
                  {mps.map((p) => (
                    <>
                        <p align="center">{p.id}</p>
                    </>
                  ))}
          </Box>
    </>
  );
}
// <TableCell align="right">{p.lot}</TableCell>
// <TableCell align="left">{p.bbe}</TableCell>
// <ButtonGroup
//   orientation="vertical"
//   variant="outlined"
//   size="small"
//   aria-label="vertical outlined button group"
// >
//   {p.eol_id ? (
//     <Eol eolId={p.eol_id} setUpdate={setUpdate}/>
//   ) : (
//     <CreateEol
//       productId={p.id}
//       po={p.po}
//       setUpdate={setUpdate}
//     />
//   )}
// </ButtonGroup>

export default Mps;
