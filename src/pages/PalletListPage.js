import React, { useEffect, useState, Suspense } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CreateNewPalletButton from "../components/pallets/buttons/CreateNewPalletButton";

// Corrected import path for PalletCard
const PalletCard = React.lazy(() => import("../components/pallets/palletLists/PalletCard"));

function PalletList() {
  const [pallets, setPallets] = useState([]);
  const [palletItems, setPalletItems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL2}/new_pallets/`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPallets(result);
        },
        (error) => {
          console.error("Error fetching pallets:", error);
        }
      );
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL2}/new_pallet_items/`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPalletItems(result);
        },
        (error) => {
          console.error("Error fetching pallet items:", error);
        }
      );
  }, []);

  return (
    <Box sx={{ p: 2, width: "100%", bgcolor: "#f5f5f5" }}> {/* Light grey background */}
      <Container sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CreateNewPalletButton />
        </Box>
      </Container>

      {pallets.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="h6">No pallets available</Typography>
        </Box>
      ) : (
        <Container maxWidth="md"> {/* Limit max width and center content */}
          {pallets.map((pallet) => (
            <Box key={pallet.pallet_id} sx={{ mb: 2, mx: "auto", px: 2 }}> {/* Adding margin and padding */}
              <Suspense fallback={<div>Loading...</div>}>
                <PalletCard pallet={pallet} palletItems={palletItems} />
              </Suspense>
            </Box>
          ))}
        </Container>
      )}
    </Box>
  );
}

export default PalletList;
