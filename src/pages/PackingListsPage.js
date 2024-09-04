// PackingListsPage.js
import React from 'react';
import OpenPackingLists from '../components/packing_lists/OpenPackingLists';
import PalletsNotOnList from '../components/packing_lists/PalletsNotOnList';
import { Container, Typography } from '@mui/material';

// Parent component that includes the OpenPackingLists component
const PackingListsPage = () => {
  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        Packing Lists
      </Typography>
      <OpenPackingLists />
      <PalletsNotOnList />
    </Container>
  );
};

export default PackingListsPage;
