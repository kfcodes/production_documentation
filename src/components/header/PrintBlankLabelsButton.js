import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

export default function PrintBlankLabels() {

const handleClick = () => {
    // fetch(`${process.env.REACT_APP_API_URL}/pallet_data/`)
    //   .then((res) => res.json())
    //   .then(
    //     (result) => {
    //       console.log(result);
          <Alert severity="success">
  <AlertTitle>Success</AlertTitle>
  This is a success alert — <strong>check it out!</strong>
</Alert>
      //   },
      //   (error) => {
      //     console.log(error);
      //   }
      // );
  };

  return (
    <>
            <Button
            onClick={() => handleClick()}
                fullWidth
                size="large"
                color="primary"
                variant="outlined"
 sx={{ width: 200, padding: 1, margin: 2 }}
            >
  Print 100 Blank Labels
            </Button>
    </>
  );
}
