import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";
import { useSubmitData } from "../hooks/useSubmitData";

const SinglePalletDetails = React.lazy(() =>
  import("../components/pallets/singlePalletDetails/SinglePalletDetails")
);
const SinglePalletItemsList = React.lazy(() =>
  import("../components/pallets/singlePalletDetails/SinglePalletItemsList")
);

export default function SinglePalletPage() {
  const { palletid } = useParams();

  const {
    data: palletDetails,
    loading: detailsLoading,
    error: detailsError,
  } = useFetchData(
    `${process.env.REACT_APP_API_URL3}/pallet_details/${palletid}`,
    [palletid]
  );

  const {
    data: palletItemsData,
    loading: itemsLoading,
    error: itemsError,
  } = useFetchData(
    `${process.env.REACT_APP_API_URL3}/pallet_items/${palletid}`,
    [palletid]
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
  } = useSubmitData(`${process.env.REACT_APP_API_URL3}/pallet/${palletid}`, "PUT");

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
    (palletData) => {
      console.log(palletData);
      submitData(palletData);
    },
    [submitData]
  );

  if (detailsLoading || itemsLoading || submitLoading) return <div>Loading...</div>;
  if (detailsError) return <div>Error loading pallet details</div>;
  if (itemsError) return <div>Error loading pallet items</div>;
  if (submitError) return <div>Error saving pallet data</div>;

  return (
    <>
      <Suspense fallback={<div>Loading components...</div>}>
        <SinglePalletDetails
          pallet_id={palletid}
          palletType={palletState.palletType}
          emptyweight={palletState.emptyweight}
          weight={palletState.weight}
          height={palletState.height}
          setPalletType={(type) =>
            setPalletState((prevState) => ({ ...prevState, palletType: type }))
          }
          setEmptyweight={(weight) =>
            setPalletState((prevState) => ({ ...prevState, emptyweight: weight }))
          }
          setWeight={(weight) =>
            setPalletState((prevState) => ({ ...prevState, weight }))
          }
          setHeight={(height) =>
            setPalletState((prevState) => ({ ...prevState, height }))
          }
          onSavePalletData={handleSavePalletDetails}
        />
        <SinglePalletItemsList
          pallet_id={palletid}
          palletItems={palletItems}
          setNewPalletItemsFunction={setPalletItems}
        />
      </Suspense>
      {success && <div>Data saved successfully!</div>}
    </>
  );
}
