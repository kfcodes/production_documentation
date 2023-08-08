import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import "./UploadPDFLables.css";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DragDropFile() {
  const [file, setFile] = useState();
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = React.useState(false);
  const inputRef = React.useRef(null);
  const [uploaded, setUploaded] = useState();
  const [printed, setPrinted] = useState();
  const [open, setOpen] = useState(false);
  const handlePdfOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const UploadPdfFile = async () => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    fetch(`${process.env.REACT_APP_API_URL}/upload_pdf`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        setUploaded(result);
      });
  };

  function printFile(filepath) {
    fetch(`${process.env.REACT_APP_API_URL}/print_pdf/${filepath}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.message);
        // setPrinted(result.message);
      });
  }

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
    // console.log(e.dataTransfer.files[0]);
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

  function printItem(filename) {
    setUploaded((oldValues) => {
      return oldValues.filter((file) => file.name !== filename);
    });
    // alert(`${filename} sent to printer`)
    fetch(`${process.env.REACT_APP_API_URL}/print_pdf/${filename}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.message);
      });
  }

  return (
    <>
      <Button
        fullWidth
        size="large"
        color="primary"
        variant="outlined"
        sx={{ width: 200, padding: 1, margin: 2 }}
        onClick={handlePdfOpen}
      >
        UPLOAD GS1 LABELS
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container maxWidth="sm">
          <Box sx={style}>
            <br />
            <>
              {printed ? (
                <>
                  <h1>{printed}</h1>
                  {listItems}
                </>
              ) : (
                <>
                  {uploaded ? (
                    <>
                      <h1>CLICK FILE TO PRINT</h1>
                      {uploaded.map((file) => (
                        <div key={file.size + file.name}>
                          <hr />
                          <Container>
                            <Button
                              size="large"
                              color="success"
                              variant="contained"
                              onClick={() => printItem(file.name)}
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
                              <p>
                                DRAG AND DROP FILES OR CLICK TO SELECT FILES
                              </p>{" "}
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
                      <button className="uploadFile" onClick={UploadPdfFile}>
                        {" "}
                        UPLOAD FILES TO SERVER{" "}
                      </button>{" "}
                    </>
                  )}
                </>
              )}
            </>
          </Box>
        </Container>
      </Modal>
    </>
  );
}
