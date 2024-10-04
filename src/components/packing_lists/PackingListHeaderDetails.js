import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Grid,
} from "@mui/material";

export default function PackingListCard({ id }) {
  const [packingList, setPackingList] = useState(null);
  const [pallets, setPallets] = useState([]); // State for pallets
  const [loading, setLoading] = useState(true); // Loading state for both packing list and pallets
  const [error, setError] = useState(null); // Error state for both packing list and pallets
  const [loadingPallets, setLoadingPallets] = useState(true); // Separate loading for pallets
  const [palletError, setPalletError] = useState(null); // Separate error for pallets
  const navigate = useNavigate();

  // Fetch the packing list data and pallets data from the API
  useEffect(() => {
    const fetchPackingListById = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL3}/packing_list_summary/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch packing list");
        }
        const data = await response.json();
        setPackingList(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchPalletsById = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL3}/packing_list_pallets/${id}` // Assuming this endpoint exists for pallets
        );
        if (!response.ok) {
          throw new Error("Failed to fetch pallets");
        }
        const palletData = await response.json();
        setPallets(palletData);
      } catch (error) {
        setPalletError(error.message);
      } finally {
        setLoadingPallets(false);
      }
    };

    fetchPackingListById();
    fetchPalletsById();
  }, [id]);

  const packingDetails = useMemo(
    () => ({
      pallets: packingList?.pallets || 0,
      small: packingList?.small || 0,
      big: packingList?.big || 0,
      weight: packingList?.weight || 0,
    }),
    [packingList]
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
        <Typography variant="body1" style={{ marginLeft: "10px" }}>
          Loading packing list...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        Error loading packing list: {error}
      </Typography>
    );
  }

  if (!packingList) {
    return (
      <Typography variant="h6" align="center">
        No packing list found.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#f0faff", // Lighter blue background
        width: "100%",
        padding: "20px 0",
        display: "flex",
        justifyContent: "center",
        position: "sticky",
        top: 0, // Keep card at top
        zIndex: 1000, // Keep above other content
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 1800, // Max width for card
          backgroundColor: "#95d8f5", // Lighter blue background
          border: "1px solid grey",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Soft shadow
        }}
      >
        <CardHeader
          title={
            <Box sx={{ textAlign: "center", width: "100%" }}>
              <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                {packingList.name || "Unknown Packing List"}
              </Typography>
            </Box>
          }
        />
        <CardContent>
          <Grid container spacing={2} justifyContent="center">
            <Grid
              item
              xs={9}
              md={4}
              sx={{
                backgroundColor: "#d5e6ed", // Slight grey background
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h3" color="text.secondary">
                TOTAL PALLETS: <b>{packingDetails.pallets}</b>
              </Typography>
            </Grid>
            <Grid
              item
              xs={8}
              md={3}
              sx={{
                backgroundColor: "#d5e6ed", // Slight grey background
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h3" color="text.secondary">
                SMALL: <b>{packingDetails.small}</b>
              </Typography>
            </Grid>
            <Grid
              item
              xs={8}
              md={3}
              sx={{
                backgroundColor: "#d5e6ed", // Slight grey background
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h3" color="text.secondary">
                BIG: <b>{packingDetails.big}</b>
              </Typography>
            </Grid>
          </Grid>

          <Grid container padding="20px" spacing={2} justifyContent="center">
            <Grid
              item
              xs={6}
              sx={{
                backgroundColor: "#d5e6ed", // Slight grey background
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h4" color="text.secondary">
                GROSS WEIGHT FOR PACKING LIST:{" "}
                <b>{packingDetails.weight} Kg </b>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>

        {/* Render Pallets */}
        <CardContent sx={{ backgroundColor: "#f9f9f9" }}>
          {loadingPallets ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
              <Typography variant="body1" style={{ marginLeft: "10px" }}>
                Loading pallets...
              </Typography>
            </Box>
          ) : palletError ? (
            <Typography variant="h6" color="error" align="center">
              Error loading pallets: {palletError}
            </Typography>
          ) : pallets.length > 0 ? (
            <Box>
              <Typography variant="h5" gutterBottom>
                Pallets
              </Typography>
              {pallets.map((pallet) => (
                <Box
                  key={pallet.pallet_id}
                  sx={{
                    border: "1px solid grey",
                    borderRadius: "8px",
                    padding: "10px",
                    marginBottom: "10px",
                    backgroundColor: "#e0f7fa",
                  }}
                >
                  <Typography variant="h6">
                    Pallet ID: {pallet.pallet_id}
                  </Typography>
                  <Typography>
                    Weight: {pallet.weight} Kg
                  </Typography>
                  <Typography>
                    Height: {pallet.height} cm
                  </Typography>
                  <Typography>
                    Type: {pallet.pallet_type_letter}
                  </Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="h6" align="center">
              No pallets found.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
