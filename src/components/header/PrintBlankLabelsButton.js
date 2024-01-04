import React from "react";
import Button from "@mui/material/Button";

export default function PrintTemporaryLabels() {
  const handleClick = () => {
    fetch(`${process.env.REACT_APP_API_URL2}/print_blank_labels`, {
      method: "post",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          alert(result.message);
        },
        (error) => {
          console.log(error);
        }
      );
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
