import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import "./UploadDataFiles.css";

export default function UploadDataFiles() {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = React.useState(false);
  const inputRef = React.useRef(null);
  const [uploaded, setUploaded] = useState();
  const [processed, setProcessed] = useState();

  const UploadDataFile = async () => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    fetch(`${process.env.REACT_APP_API_URL}/upload_data`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        setUploaded(result);
      });
  };

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles([...files, ...e.dataTransfer.files]);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const listItems = files.map((file) => (
    <div key={file.size + file.name}>
      <hr />
      <h3>{file.name}</h3>
    </div>
  ));

  function processFile() {
    // setUploaded((oldValues) => {
    //   return oldValues.filter((file) => file.name !== filename);
    // });
    fetch(`${process.env.REACT_APP_API_URL}/process_data`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.message);
      });
  }

  return (
    <>
      <Box>
        <Container maxWidth="sm">
          <br />
          <>
            {uploaded ? (
              <>
                <h1>CLICK FILE TO PROCESS</h1>
                {uploaded.map((file) => (
                  <div key={file.size + file.name}>
                    <hr />
                    <Container>
                      <Button
                        size="large"
                        color="success"
                        variant="contained"
                  onClick={() => processFile(file.name)}
                      >
                        {file.name}
                      </Button>
                    </Container>
                  </div>
                ))}
                <hr />{" "}
              </>
            ) : (
              <>
                <>
                  {" "}
                  <form
                    id="form-file-upload"
                    onDragEnter={handleDrag}
                    onSubmit={(e) => e.preventDefault()}
                  >
                    {" "}
                    <input
                      ref={inputRef}
                      type="file"
                      id="input-file-upload"
                      multiple={true}
                      onChange={handleChange}
                    />{" "}
                    <label
                      id="label-file-upload"
                      htmlFor="input-file-upload"
                      className={dragActive ? "drag-active" : ""}
                    >
                      {" "}
                      <div>
                        {" "}
                        <p>DRAG AND DROP FILES OR CLICK TO SELECT FILES</p>{" "}
                      </div>{" "}
                    </label>{" "}
                    {dragActive && (
                      <div
                        id="drag-file-element"
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      ></div>
                    )}{" "}
                  </form>{" "}
                </>
                <h1>UPLOAD THE FOLLOWING FILES TO THE SERVER</h1>
                <Container>{listItems}</Container>
                <hr />
                <br />
                <button className="uploadFile" onClick={UploadDataFile}>
                  {" "}
                  UPLOAD FILES TO SERVER{" "}
                </button>{" "}
              </>
            )}
          </>
        </Container>
      </Box>
    </>
  );
}
