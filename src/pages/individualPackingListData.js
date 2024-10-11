import React from "react";
import { useParams } from "react-router-dom";
import PackingListHeaderDetails from "../components/packing_lists/PackingListInfo"; // Import the child component

const IndividualPackingListPage = () => {
  const { id } = useParams(); // Extract the 'id' parameter from the URL

  return (
    <div>
      <PackingListHeaderDetails id={id} />
    </div>
  );
};

export default IndividualPackingListPage;
