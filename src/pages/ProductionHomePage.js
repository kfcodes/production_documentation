import React, { useEffect, useState, Suspense } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CreateNewPalletButton from "../components/pallets/buttons/CreateNewPalletButton";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ProductionReview from "../components/production/ProductionReviewTable";

const PalletCard = React.lazy(() =>
  import("../components/pallets/palletLists/PalletCard"),
);

function PalletList() {
  const [pallets, setPallets] = useState([]);
  const [palletItems, setPalletItems] = useState([]);
  const [loadingPallets, setLoadingPallets] = useState(true);
  const [loadingPalletItems, setLoadingPalletItems] = useState(true);
  const [palletError, setPalletError] = useState(null);
  const [palletItemsError, setPalletItemsError] = useState(null);
  const [showMore, setShowMore] = useState(false); // Control showing more pallets

  const palletsToShow = showMore ? pallets : pallets.slice(0, 10); // First 10 pallets unless "showMore" is true

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL2}/new_pallets/`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPallets(result);
          setLoadingPallets(false);
        },
        (error) => {
          setPalletError(error);
          setLoadingPallets(false);
        },
      );
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL2}/new_pallet_items/`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPalletItems(result);
          setLoadingPalletItems(false);
        },
        (error) => {
          setPalletItemsError(error);
          setLoadingPalletItems(false);
        },
      );
  }, []);

  const handleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <Box sx={{ p: 2, width: "100%", bgcolor: "#D0D0D0" }}>
      <ProductionReview />
      <Container sx={{ mb: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CreateNewPalletButton />
        </Box>
      </Container>

      {loadingPallets ? (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="h6">Loading pallets...</Typography>
        </Box>
      ) : palletError ? (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="h6" color="error">
            Error loading pallets: {palletError.message}
          </Typography>
        </Box>
      ) : pallets.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="h6">No pallets available</Typography>
        </Box>
      ) : (
        <Container maxWidth="md">
          {palletsToShow.map((pallet) => (
            <Box key={pallet.pallet_id} sx={{ mb: 2, mx: "auto", px: 2 }}>
              <Suspense fallback={<Typography>Loading pallet...</Typography>}>
                <PalletCard pallet={pallet} palletItems={palletItems} />
              </Suspense>
            </Box>
          ))}

          {pallets.length > 10 && (
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <IconButton onClick={handleShowMore}>
                <Typography variant="body1">
                  {showMore ? "Show Less" : "Show More"}
                </Typography>
                <ExpandMoreIcon
                  sx={{
                    transform: showMore ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s",
                  }}
                />
              </IconButton>
            </Box>
          )}

          {/* Render the additional pallets when showMore is true */}
          <Collapse in={showMore}>
            {pallets.slice(10).map((pallet) => (
              <Box key={pallet.pallet_id} sx={{ mb: 2, mx: "auto", px: 2 }}>
                <Suspense fallback={<Typography>Loading pallet...</Typography>}>
                  <PalletCard pallet={pallet} palletItems={palletItems} />
                </Suspense>
              </Box>
            ))}
          </Collapse>
        </Container>
      )}
    </Box>
  );
}

export default PalletList;
