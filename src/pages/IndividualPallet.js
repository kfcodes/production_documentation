import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";
import { useSubmitData } from "../hooks/useSubmitData";
import { Divider, Box, Card, CardContent, Button } from "@mui/material";
import PrintLabelButton from "../components/pallets/buttons/PrintPalletLabelButton"; // Import the PrintLabelButton

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
        const response = await fetch(
          `${process.env.REACT_APP_API_URL3}/pallet_items/${palletid}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch pallet items");
        }

        const updatedItems = await response.json();
        setPalletItems(updatedItems);

        console.log(
          "Pallet items successfully fetched and updated:",
          updatedItems,
        );
      } catch (error) {
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

  // Condition to show PrintLabelButton (valid values for height, weight, and empty weight)
  const canShowPrintLabelButton =
    palletState.height && palletState.weight && palletState.emptyweight;

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
            marginBottom: 1,
            marginTop: 5,
          }}
        >
          <Card
            variant="outlined"
            sx={{
              bgcolor: "background.paper",
              minWidth: 300,
              marginBottom: 2,
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
              <hr />
              <SinglePalletItemsList
                palletId={palletid}
                palletItems={palletItems}
                reloadPalletItems={refetchPalletItems} // Pass refetch function to reload items
              />
              <Divider sx={{ marginBottom: 3 }} />

              {/* Conditionally render the PrintLabelButton */}
              {canShowPrintLabelButton && (
                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <PrintLabelButton id={palletid} />
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Suspense>
      {success && <div>Data saved successfully!</div>}
    </>
  );
}
