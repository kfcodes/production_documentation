import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckBoxOutlineBlankOutlined from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import DraftsOutlined from "@mui/icons-material/DraftsOutlined";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import InboxOutlined from "@mui/icons-material/InboxOutlined";
import MailOutline from "@mui/icons-material/MailOutline";
import ReceiptOutlined from "@mui/icons-material/ReceiptOutlined";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Stack from "@mui/material/Stack";

const data = [
  { name: "Upload GS1", link: "/upload_pdf" },
  { name: "Upload Data Files", link: "/upload_data"},
  { name: "Export Pallets", link: "/export"},
  { name: "Packing Lists", link:  "/" },
];

export default function SideBar() {
  const [open, setOpen] = useState(false);

  const getList = () => (
    <div style={{ width: 250 }} onClick={() => setOpen(false)}>
      {data.map((item) => (
              <Button
                href={`/${item.link}`}
                fullWidth
                size="large"
                color="primary"
                variant="text"
 sx={{ width: 200, padding: 1, margin: 2 }}
              >
        {item.name}
        </Button>
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
    <Stack spacing={10}>
        {getList()}
    </Stack>
      </Drawer>
    </div>
  );
}
