import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SinglePalletDetails from "../components/pallets/singlePalletDetails/SinglePalletDetails";
import SinglePalletItemsList from "../components/pallets/singlePalletDetails/SinglePalletItemsList";
import { useFetchData } from "../hooks/useFetchData";
import { useSubmitData } from "../hooks/useSubmitData";

export default function SinglePalletPage() {
  const { palletid } = useParams();

  const { data: palletDetails, loading: detailsLoading, error: detailsError } = useFetchData(
    `${process.env.REACT_APP_API_URL3}/pallet_details/${palletid}`,
    [palletid]
  );

  const { data: palletItemsData, loading: itemsLoading, error: itemsError } = useFetchData(
    `${process.env.REACT_APP_API_URL3}/pallet_items/${palletid}`,
    [palletid]
  );

  const [palletType, setPalletType] = useState("");
  const [emptyweight, setEmptyweight] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [palletItems, setPalletItems] = useState([]);

  const { loading: submitLoading, error: submitError, success, submitData } = useSubmitData(
    `${process.env.REACT_APP_API_URL3}/pallet/${palletid}`,
    "PUT"
  );

  useEffect(() => {
    if (palletDetails && palletDetails.length > 0) {
      setPalletType(palletDetails[0].pallet_type);
      setEmptyweight(palletDetails[0].empty_weight);
      setWeight(palletDetails[0].weight);
      setHeight(palletDetails[0].height);
    }
  }, [palletDetails]);

  useEffect(() => {
    if (palletItemsData) {
      setPalletItems(palletItemsData);
    }
  }, [palletItemsData]);

  const handleSavePalletDetails = () => {
    const palletData = {
      pallet_id: palletid,
      pallet_type: palletType,
      empty_weight: emptyweight,
      weight,
      height,
    };
    console.log(palletData);
    submitData(palletData);
  };

  if (detailsLoading || itemsLoading || submitLoading) return <div>Loading...</div>;
  if (detailsError || itemsError || submitError) return <div>Error loading data</div>;

  return (
    <>
      <SinglePalletDetails
        pallet_id={palletid}
        palletType={palletType}
        emptyweight={emptyweight}
        weight={weight}
        height={height}
        setPalletType={setPalletType}
        setEmptyweight={setEmptyweight}
        setWeight={setWeight}
        setHeight={setHeight}
        onSavePalletData={handleSavePalletDetails}
      />
      <SinglePalletItemsList
        pallet_id={palletid}
        palletItems={palletItems}
        setNewPalletItemsFunction={setPalletItems}
      />
      {success && <div>Data saved successfully!</div>}
    </>
  );
}
