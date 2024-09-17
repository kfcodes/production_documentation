import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function CreateNewPalletItem({ palletId, reload }) {
  const createNewPalletItem = async (pallet) => {
    try {
      const palletItemData = {
        pallet_item_pallet_id: pallet,
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_URL3}/pallet_item/${pallet}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(palletItemData),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create new pallet item");
      }

      const result = await response.json();
      console.log("Pallet item created:", result);

      // Call reload to refresh the pallet items list after the new item is added
      reload();
    } catch (error) {
      console.error("Error creating new pallet item:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 2, // Margin top to create space from the component above
        width: "100%",
      }}
    >
      <Button
        onClick={() => createNewPalletItem(palletId)}
        sx={{
          width: "100%",
          maxWidth: 200, // Limit the button width to 400px
          padding: 2,
          borderRadius: 2,
          boxShadow: 2,
          backgroundColor: "#F6A6BA", // Light blue background
          color: "#000",
          textAlign: "center",
          fontSize: "1rem",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#b0bec5", // Darker blue-grey on hover
          },
        }}
      >
        NEW ITEM
      </Button>
    </Box>
  );
}
