import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SideBar from "./SideBar";

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
      <Grid container padding={2} spacing={3} justifyContent="center">
        <AppBar position="absolute" component="nav" color="primary">
          <Toolbar>
            <Grid item xs={1}>
              <SideBar />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
              <Button
                href="/"
                fullWidth
                size="large"
                color="warning"
                variant="contained"
                xs={style}
              >
                PALLETIZATION
              </Button>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
              <Button
                href="/production/"
                fullWidth
                size="large"
                color="warning"
                variant="contained"
                xs={style}
              >
                PRODUCTION
              </Button>
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
      <br />
    </>
  );
}

export default Header;
