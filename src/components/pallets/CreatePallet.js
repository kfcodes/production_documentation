import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function CreateNewPallet() {
  const navigate = useNavigate();

  function navigate1(palletid) {
    navigate(`/pallet/${palletid}/pallet_item/`);
  }

  function createPallet() {
    fetch(`${process.env.REACT_APP_API_URL}/pallet`, {
      method: "post",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        navigate1(result["LAST_INSERT_ID()"]);
      });
  }

  return (
    <>
      <Button
        variant="contained"
        size="large"
        color="success"
        onClick={createPallet}
      >
        Create New Pallet
      </Button>
    </>
  );
}
