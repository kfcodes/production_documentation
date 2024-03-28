import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function DeletePalletItem(id, state) {
  const item_id = id["id"];
  const updateState = id["state"];

  const deletePalletItem = (item_id) => {
    fetch(`${process.env.REACT_APP_API_URL2}/pallet_item/${item_id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((result) => {
      updateState(result);
    });
  };

  return (
    <>
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
                deletePalletItem(item_id);
              }}
            >
              DELETE
            </Button>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
