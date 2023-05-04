import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

const style = {
  width: "100%",
  border: "none",
  bgcolor: "#04AA6D",
  color: "white",
  padding: "14px 28px",
  FontFace: "26px",
  cursor: "pointer",
  display: "flex",
};

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
      </Box>
    </>
  );
}

export default Header;
