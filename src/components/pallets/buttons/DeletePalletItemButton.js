export default function DeletePalletItem(item_id) {
  fetch(`${process.env.REACT_APP_API_URL3}/pallet_item/${item_id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((result) => {
    console.log(result);
  });
};
