// PackingListsPage.js
import React from 'react';
import OpenPackingLists from '../components/packing_lists/OpenPackingLists';
import PalletsNotOnList from '../components/packing_lists/PalletsNotOnList';
import { Container, Typography, Box } from '@mui/material';

// Parent component that includes the OpenPackingLists and PalletsNotOnList components
const PackingListsPage = () => {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex', // Enables Flexbox
          flexDirection: 'column', // Ensures the content is stacked vertically
          alignItems: 'center', // Centers the content horizontally
          justifyContent: 'center', // Centers the content vertically
          minHeight: '100vh', // Makes the box take the full height of the screen
          textAlign: 'center', // Ensures the text is centered inside its container
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Packing Lists
        </Typography>
        <PalletsNotOnList />
        <OpenPackingLists />
      </Box>
    </Container>
  );
};

export default PackingListsPage;
