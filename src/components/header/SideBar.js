import React, { useState } from "react";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import DragDropFile from "../uploadGS1/UploadPDFLables";
import UploadDataFiles from "../uploadData/UploadDataFiles";
import ExportPalletData from "../pallets/buttons/ExportPalletDataButton";
import PrintTemporaryLabels from "./PrintBlankLabelsButton";
import SearchPallets from "../pallets/searchPalletModal/SearchPallet";
import COMBINE from "../pallets/buttons/MoveToCombeinePallets";
import FinishedProduct from "../finishedProducts/FinishedProduct";
import ThisWayUpLabels from "./printThisWayUpLabels";

const data = [
  { name: "Packing Lists", link: "/" },
  { name: "Latest Pallets", link: "/latest_pallets" },
];

export default function SideBar() {
  const [open, setOpen] = useState(false);

  const getList = () => (
    <div style={{ width: 250 }} onClick={() => setOpen(false)}>
      {data.map((item) => (
        <Link to={item.link}>
          <Button
            fullWidth
            size="large"
            color="primary"
            variant="outlined"
            sx={{ width: 200, padding: 1, margin: 2 }}
          >
            {item.name}
          </Button>
        </Link>
      ))}
    </div>
  );

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
        <Container>
          <Stack spacing={4}>
            <br />
            <br />
            <SearchPallets />
            <ExportPalletData />
            <DragDropFile />
            <UploadDataFiles />
            <PrintTemporaryLabels />
            <ThisWayUpLabels />
            <FinishedProduct />
            <COMBINE />
            <h3>PACKING LISTS</h3>
            {getList()}
          </Stack>
        </Container>
      </Drawer>
    </div>
  );
}
