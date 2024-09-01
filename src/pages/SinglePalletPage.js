import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";
import { useSubmitData } from "../hooks/useSubmitData";
import { Divider, Box, Card, CardContent } from "@mui/material";

const SinglePalletDetails = React.lazy(() =>
  import("../components/pallets/singlePalletDetails/SinglePalletDetails"),
);
const SinglePalletItemsList = React.lazy(() =>
  import("../components/pallets/singlePalletDetails/SinglePalletItemsList"),
);

export default function SinglePalletPage() {
  const { palletid } = useParams();

  const {
    data: palletDetails,
    loading: detailsLoading,
    error: detailsError,
  } = useFetchData(
    `${process.env.REACT_APP_API_URL3}/pallet_details/${palletid}`,
    [palletid],
  );

  const {
    data: palletItemsData,
    loading: itemsLoading,
    error: itemsError,
    refetch: refetchPalletItems = async () => {
      try {
        // Send a GET request to fetch the latest pallet items for the given palletId
        const response = await fetch(
          `${process.env.REACT_APP_API_URL3}/pallet_items/${palletid}`,
        );

        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Failed to fetch pallet items");
        }

        // Parse the response JSON data
        const updatedItems = await response.json();

        // Update the local state with the fetched items
        setPalletItems(updatedItems);

        console.log(
          "Pallet items successfully fetched and updated:",
          updatedItems,
        );
      } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error("Error fetching pallet items:", error);
      }
    },
  } = useFetchData(
    `${process.env.REACT_APP_API_URL3}/pallet_items/${palletid}`,
    [palletid],
  );

  const [palletState, setPalletState] = useState({
    palletType: "",
    emptyweight: "",
    weight: "",
    height: "",
  });

  const [palletItems, setPalletItems] = useState([]);

  const {
    loading: submitLoading,
    error: submitError,
    success,
    submitData,
  } = useSubmitData(
    `${process.env.REACT_APP_API_URL3}/pallet/${palletid}`,
    "PUT",
  );

  useEffect(() => {
    if (palletDetails && palletDetails.length > 0) {
      const { pallet_type, empty_weight, weight, height } = palletDetails[0];
      setPalletState({
        palletType: pallet_type,
        emptyweight: empty_weight,
        weight,
        height,
      });
    }
  }, [palletDetails]);

  useEffect(() => {
    if (palletItemsData) {
      setPalletItems(palletItemsData);
    }
  }, [palletItemsData]);

  const handleSavePalletDetails = useCallback(
    (updatedFields) => {
      const updatedPalletData = {
        pallet_id: palletid,
        pallet_type: updatedFields.palletType || palletState.palletType,
        empty_weight: updatedFields.emptyweight || palletState.emptyweight,
        weight: updatedFields.weight || palletState.weight,
        height: updatedFields.height || palletState.height,
      };
      submitData(updatedPalletData);
      setPalletState((prevState) => ({
        ...prevState,
        ...updatedFields,
      }));
    },
    [palletid, palletState, submitData],
  );

  if (detailsLoading || itemsLoading || submitLoading)
    return <div>Loading...</div>;
  if (detailsError) return <div>Error loading pallet details</div>;
  if (itemsError) return <div>Error loading pallet items</div>;
  if (submitError) return <div>Error saving pallet data</div>;

  return (
    <>
      <Suspense fallback={<div>Loading Data...</div>}>
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            marginRight: 5,
            marginLeft: 5,
            marginBottom: 10,
            marginTop: 5,
          }}
        >
          <Card
            variant="outlined"
            sx={{
              bgcolor: "background.paper",
              minWidth: 300,
              marginBottom: 10,
              padding: 1,
              boxShadow: 5,
              borderRadius: 5,
            }}
          >
            <CardContent>
              <SinglePalletDetails
                pallet_id={palletid}
                palletType={palletState.palletType}
                emptyweight={palletState.emptyweight}
                weight={palletState.weight}
                height={palletState.height}
                onSavePalletData={handleSavePalletDetails}
              />
              <SinglePalletItemsList
                palletId={palletid}
                palletItems={palletItems}
                reloadPalletItems={refetchPalletItems} // Pass refetch function to reload items
              />
              <Divider sx={{ marginBottom: 3 }} />
            </CardContent>
          </Card>
        </Box>
      </Suspense>
      {success && <div>Data saved successfully!</div>}
    </>
  );
}
