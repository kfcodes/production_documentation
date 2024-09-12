import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  CircularProgress,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PackingListPalletList from './PackingListPalletList'; // Import the component

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PackingListCard({ id }) {
  const [packingList, setPackingList] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // State for menu
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  // Fetch the packing list data from the API
  useEffect(() => {
    const fetchPackingListById = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL3}/packing_list_summary/${id}`);
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

    fetchPackingListById();
  }, [id]);

  const handleExpandClick = () => {
    setExpanded(!expanded); // Toggle expanded state
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Opens the menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Closes the menu
  };

  const handleLoadPackingList = () => {
    navigate(`/picklist/${id}`); // Navigates to /picklist/id
  };

  const handlePrintPicklist = () => {
    window.print(); // Simple print functionality
  };

  if (loading) {
    return <CircularProgress style={{ display: "block", margin: "20px auto" }} />;
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
        backgroundColor: "#f0faff", // Much lighter, more faded blue background
        width: "100%",
        padding: "20px 0", // Space above and below the card
        display: "flex",
        justifyContent: "center", // Center the card horizontally
        position: "sticky", // Keep the card at the top of the page
        top: 0, // Stick the card to the top
        zIndex: 1000, // Ensure it stays above other content
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 1800, // Set a max width for the card to avoid stretching too wide
          backgroundColor: "#95d8f5", // Lighter blue background for the card itself
          border: "1px solid grey", // Narrow grey border
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Soft shadow
        }}
      >
        <CardHeader
          action={
            <>
              <IconButton aria-label="settings" onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                PaperProps={{
                  style: {
                    width: "200px",
                  },
                }}
              >
                <MenuItem onClick={handleLoadPackingList}>Load Packing List</MenuItem>
                <MenuItem onClick={handlePrintPicklist}>Print Picklist</MenuItem>
              </Menu>
            </>
          }
          title={
            <Box sx={{ textAlign: "center", width: "100%" }}>
              <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                {packingList.name || "Unknown Packing List"}
              </Typography>
            </Box>
          }
        />
        <CardContent>
          <Grid container spacing={2} justifyContent="center"> {/* Increased spacing */}
            <Grid
              item
              xs={9}
              md={4}
              sx={{
                backgroundColor: "#d5e6ed", // Slight grey background for the grid item
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h3" color="text.secondary">
                TOTAL PALLETS: <b>{packingList.pallets || 0}</b>
              </Typography>
            </Grid>
            <Grid
              item
              xs={8}
              md={3}
              sx={{
                backgroundColor: "#d5e6ed", // Slight grey background for the grid item
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h3" color="text.secondary">
                SMALL: <b>{packingList.small || 0}</b>
              </Typography>
            </Grid>
            <Grid
              item
              xs={8}
              md={3}
              sx={{
                backgroundColor: "#d5e6ed", // Slight grey background for the grid item
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h3" color="text.secondary">
                BIG: <b>{packingList.big || 0}</b>
              </Typography>
            </Grid>
          </Grid>

          <Grid container padding="30px" spacing={2} justifyContent="center"> {/* Increased spacing */}
            <Grid
              item
              xs={6}
              sx={{
                backgroundColor: "#d5e6ed", // Slight grey background for the grid item
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h4" color="text.secondary">
                GROSS WEIGHT FOR PACKING LIST: <b>{packingList.weight || 0} Kg </b>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ backgroundColor: "#f9f9f9" }}>
            {/* Conditionally render PackingListPalletList only when expanded */}
            {expanded && <PackingListPalletList packingList={packingList} />}
          </CardContent>
        </Collapse>
      </Card>
    </Box >
  );
}
