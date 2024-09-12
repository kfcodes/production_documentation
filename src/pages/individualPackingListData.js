import React from 'react';
import { Typography, Grid, Box, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom theme with lighter background and rounded corners
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

const PackingListHeader = ({ packingList }) => {
  if (!packingList) {
    return null; // Render nothing if packingList data is not available
  }

  return (
    <ThemeProvider theme={theme}>
      <Container sx={containerStyle}>
        <Box mb={2}>
          {/* Display the packing list name as the heading */}
          <Typography variant="h4" component="h1" align="center" color="text.primary" gutterBottom>
            {packingList.name}
          </Typography>
        </Box>
        {/* Grid container for other packing list data */}
        <Grid container spacing={2} justifyContent="center">
          {/* Each data point gets a grid item */}
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

export default PackingListHeader;

