import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function PrintLabelButton({ id }) {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const printPalletLabel = (pallet_id) => {
    fetch(`${process.env.REACT_APP_API_URL2}/label/${pallet_id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch label");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Label printed successfully", data);
        navigate("/"); // Navigate to home page after successful label print
      })
      .catch((error) => {
        console.error("Error printing label:", error);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 3, // Slightly larger margin top for spacing
        width: "100%",
      }}
    >
      <Button
        onClick={() => printPalletLabel(id)}
        sx={{
          width: "100%",
          maxWidth: 250, // Slightly wider button
          padding: 3, // Increase padding for a larger button
          borderRadius: 3, // Slightly larger border radius
          boxShadow: 3,
          backgroundColor: "#A8D5BA", // Pastel green background
          color: "#2F4F4F", // Darker text for better contrast (Dark Slate Gray)
          textAlign: "center",
          fontSize: "1.2rem", // Larger font size
          fontWeight: "bold",
          whiteSpace: "nowrap", // Prevent text wrapping
          "&:hover": {
            backgroundColor: "#8FBF9E", // Slightly darker pastel green on hover
          },
        }}
      >
        PRINT PALLET LABEL
      </Button>
    </Box>
  );
}
