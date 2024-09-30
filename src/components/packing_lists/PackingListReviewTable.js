import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Alert,
  IconButton,
  Collapse,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const ProductionReview = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);  // State to control table expansion

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL3}/production_review/`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Toggle expanded state
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Render loading, error, or table content
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Error: {error}
      </Alert>
    );
  }

  // Split the data into the first 10 rows and the rest
  const initialData = data.slice(0, 10);
  const remainingData = data.slice(10);

  return (
    <div>
      <Typography align="center" variant="h4" gutterBottom>
        <b>Production Review</b>
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          width: '85%',
          margin: '0 auto', // Center the table on the page
          boxShadow: 3,
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: '#BBDEFB'
              }}
            >
              <TableCell><strong>Product ID</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Lot</strong></TableCell>
              <TableCell><strong>Batch</strong></TableCell>
              <TableCell><strong>Total</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {initialData.map((item, index) => (
              <TableRow
                key={item.product_id}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#E3F2FD' : '#BBDEFB', // Light blue and darker blue stripes
                }}
              >
                <TableCell>{item.product_id}</TableCell>
                <TableCell><b>{item.product_description}</b></TableCell>
                <TableCell>{item.lot}</TableCell>
                <TableCell>{item.batch}</TableCell>
                <TableCell>{item.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Table>
            <TableBody>
              {remainingData.map((item, index) => (
                <TableRow
                  key={item.product_id}
                  sx={{
                    backgroundColor: (index % 2 === 0 ? '#E3F2FD' : '#BBDEFB'), // Continue the striped pattern
                  }}
                >
                  <TableCell>{item.product_id}</TableCell>
                  <TableCell>{item.product_description}</TableCell>
                  <TableCell>{item.lot}</TableCell>
                  <TableCell>{item.batch}</TableCell>
                  <TableCell>{item.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Collapse>
      </TableContainer>
      {data.length > 10 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <IconButton onClick={handleExpandClick}>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default ProductionReview;

