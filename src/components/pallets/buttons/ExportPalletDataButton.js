import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import * as XLSX from "xlsx";

export default function ExportPalletData() {
  const [fullPalletData, setFullPalletData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL2}/pallet_data/`)
      .then((res) => res.json())
      .then(
        (result) => {
          setFullPalletData(result);
          console.log(fullPalletData);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const handleOnExport = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(fullPalletData);
    XLSX.utils.book_append_sheet(wb, ws, "Test Sheet");
    XLSX.writeFile(wb, "testExcelFile.xlsx");
  };

  return (
    <>
      <Button
        onClick={() => handleOnExport()}
        fullWidth
        size="large"
        color="primary"
        variant="outlined"
        sx={{ width: 200, padding: 1, margin: 2 }}
      >
        EXPORT PALLET DATA
      </Button>
    </>
  );
}
