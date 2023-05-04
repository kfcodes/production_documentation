import React, { useEffect, useState } from "react";
import CreateNewPallet from "./CreatePallet";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

function Header() {

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
                    <Button
                      href="/"
                      fullWidth
                      size="large"
                      color="warning"
                      variant="contained"
                      xs={style}
                    >
                      PALLETS
                    </Button>
                    <Button
                      href="/mps/"
                      fullWidth
                      size="large"
                      color="warning"
                      variant="contained"
                    >
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
            <Button
                    onClick={() => handleOnExport()}
              size="large"
              color="primary"
              variant="contained"
            >
            EXPORT PACKING LIST
            </Button>
            <CreateNewPallet />
          </Stack>
          </Grid>
        </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Header;
