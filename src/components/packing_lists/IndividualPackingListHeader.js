import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

const PackingListHeader = ({ id }) => {
  const [packingList, setPackingList] = useState(null); // State to store the packing list data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch the packing list summary from the API
  useEffect(() => {
    const fetchPackingListSummary = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL3}/packing_list_summary/${id}` // API call
        );
        if (!response.ok) {
          throw new Error("Failed to fetch packing list summary");
        }
        const data = await response.json();
        setPackingList(data); // Set the packing list data
      } catch (error) {
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Turn off loading state
      }
    };

    fetchPackingListSummary(); // Call the async function
  }, [id]); // Re-run effect if the `id` changes

  // Show loading spinner if data is being fetched
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
        <Typography variant="body1" style={{ marginLeft: "10px" }}>
          Loading packing list summary...
        </Typography>
      </Box>
    );
  }

  // Show error message if there is an error
  if (error) {
    return (
      <Alert severity="error" sx={{ marginTop: "20px" }}>
        Error: {error}
      </Alert>
    );
  }

  // Fallback in case no packing list is found
  if (!packingList) {
    return (
      <Typography variant="h6" align="center" sx={{ marginTop: "20px" }}>
        No packing list data available.
      </Typography>
    );
  }

  // The packing details
  const packingDetails = {
    pallets: packingList.pallets || 0,
    small: packingList.small || 0,
    big: packingList.big || 0,
    weight: packingList.weight || 0,
  };

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
              xs={3}
              sx={{
                backgroundColor: "#d5e6ed", // Slight grey background
                padding: "10px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <Typography variant="h4" color="text.secondary">
                TOTAL PALLETS: <b>{packingDetails.pallets}</b>
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                backgroundColor: "#d5e6ed", // Slight grey background
                padding: "10px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <Typography variant="h4" color="text.secondary">
                SMALL: <b>{packingDetails.small}</b>
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                backgroundColor: "#d5e6ed", // Slight grey background
                padding: "10px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <Typography variant="h4" color="text.secondary">
                BIG: <b>{packingDetails.big}</b>
              </Typography>
            </Grid>
          </Grid>

          <Grid container padding="20px" spacing={2} justifyContent="center">
            <Grid
              item
              xs={8}
              sx={{
                backgroundColor: "#d5e6ed", // Slight grey background
                padding: "10px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <Typography variant="h4" color="text.secondary">
                GROSS WEIGHT FOR PACKING LIST:{" "}
                <b>{packingDetails.weight} Kg </b>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PackingListHeader;
