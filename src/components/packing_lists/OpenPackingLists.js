import React, { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress, Card, CardContent, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // React Router for navigation
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom theme with lighter background and rounded corners
const theme = createTheme({
  palette: {
    background: {
      default: '#e0e0e0', // Lighter grey background
    },
    text: {
      primary: '#000000', // Black text for contrast
    },
  },
});

const containerStyle = {
  backgroundColor: '#f5f5f5', // Slightly lighter background for the container
  borderRadius: '16px', // Rounded corners for the container
  padding: '32px 16px',
  marginTop: '20px', // Add some space at the top
  marginBottom: '20px', // Add some space at the bottom
};

const cardStyle = {
  backgroundColor: '#d8f3dc', // Very light green color for the card
  color: '#1b4332', // Dark green text for contrast
  borderRadius: '12px', // Rounded corners for cards
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow for modern effect
  transition: 'transform 0.2s, background-color 0.3s', // Smooth hover effect
  display: 'flex', // Enables Flexbox for centering
  alignItems: 'center', // Centers items vertically
  justifyContent: 'center', // Centers items horizontally
  textAlign: 'center', // Center text in the card
  '&:hover': {
    backgroundColor: '#b7e4c7', // Darker green on hover
    transform: 'scale(1.05)', // Slightly scale the card on hover
    cursor: 'pointer', // Pointer cursor on hover
  },
};

// Component to display a list of packing lists as cards
const PackingListCards = () => {
  const [packingLists, setPackingLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the packing lists from the API
    const fetchPackingLists = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL3}/open_packing_lists/`);
        const data = await response.json();
        const listArray = Object.values(data); // Convert the object to an array
        setPackingLists(listArray);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching packing lists:', error);
        setLoading(false);
      }
    };

    fetchPackingLists();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  const handleCardClick = (packingListId) => {
    navigate(`/packing_list/${packingListId}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={containerStyle}>
        {/* Packing Lists */}
        <Typography variant="h4" component="h1" gutterBottom color="text.primary" align="center">
          Open Packing Lists
        </Typography>
        <Grid container spacing={4}>
          {packingLists.map((list) => (
            <Grid item xs={12} sm={6} md={4} key={list.packing_list_id}>
              <Card sx={cardStyle} onClick={() => handleCardClick(list.packing_list_id)}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {list.packing_list_name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default PackingListCards;
