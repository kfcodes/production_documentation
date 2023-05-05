import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function CreateNewPalletButton() {
  const navigate = useNavigate();

  function navigateFunction(palletid) {
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
        navigateFunction(result["LAST_INSERT_ID()"]);
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
