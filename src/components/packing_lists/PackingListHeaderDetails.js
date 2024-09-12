import React, { useState, useEffect } from 'react';
import { Typography, Grid, Box, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom theme
const theme = createTheme({
  palette: {
    background: {
      default: '#f5f5f5', // Lighter grey background
    },
    text: {
      primary: '#000000', // Black text for contrast
    },
  },
});

const containerStyle = {
  backgroundColor: '#ffffff', // White background for contrast
  borderRadius: '8px', // Slightly rounded corners
  padding: '16px',
  marginTop: '20px', // Add space at the top
  marginBottom: '20px', // Add space at the bottom
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Soft shadow for better appearance
};

const PackingListHeaderDetails = ({ id }) => {
  const [packingList, setPackingList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch the packing list data based on the passed id
  useEffect(() => {
    const fetchPackingListById = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL3}/packing_list_summary/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch packing list');
        }
        const data = await response.json();
        setPackingList(data);
      } catch (error) {
        console.error('Error fetching packing list:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPackingListById();
    }
  }, [id]);

  if (loading) {
    return (
      <Typography variant="h6" align="center" color="text.secondary">
        Loading...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" align="center" color="error">
        Error loading packing list. Please try again later.
      </Typography>
    );
  }

  if (!packingList) {
    return (
      <Typography variant="h6" align="center" color="text.secondary">
        No packing list found.
      </Typography>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container sx={containerStyle}>
        <Box mb={2}>
          <Typography variant="h4" component="h1" align="center" color="text.primary" gutterBottom>
            {packingList.name}
          </Typography>
        </Box>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={3}>
            <Typography variant="body1" color="text.secondary">
              Big: {packingList.big}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="body1" color="text.secondary">
              Small: {packingList.small}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="body1" color="text.secondary">
              Pallets: {packingList.pallets}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="body1" color="text.secondary">
              Weight: {packingList.weight} kg
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default PackingListHeaderDetails;
