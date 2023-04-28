import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Alert from '@mui/material/Alert';

import "./UploadPDFLables.css";

export default function DragDropFile() {
  const [file, setFile] = useState();
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = React.useState(false);
  const inputRef = React.useRef(null);
  const [uploaded, setUploaded] = useState();
  const [printed, setPrinted] = useState();

  const UploadPdfFile = async () => {
    const formData = new FormData();
    files.forEach((file) => 
    formData.append("files", file))
    // console.log(formData.getAll('files'));
    fetch(`${process.env.REACT_APP_API_URL}/upload_pdf`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        setUploaded(result)
        // result.map((file) => console.log(file));
  })};

  function printFile(filepath) {
    // console.log(uploaded);
    fetch(`${process.env.REACT_APP_API_URL}/print_pdf/${filepath}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.message);
        // setPrinted(result.message);
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
    // console.log(e.dataTransfer.files[0]);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles([...files, ...e.dataTransfer.files]);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files ) {
      const newFiles = Array.from(e.target.files)
      setFiles([...files, ...newFiles]);
    }
  };

    // <div  key={file.size}>
  const listItems = files.map((file) =>
    <div  key={file.size+file.name}>
    <hr />
    <h3>
    {file.name}</h3>
    </div>
  );


  function printItem(filename) {
      // <Alert severity="success">This is a success alert — check it out!</Alert>
      // printFile(file.name) 
     // let uploads = uploaded.splice(file); 
     // uploaded.splice(file); 
    // console.log(uploads)
      // setUploaded(...uploads);
      // setUploaded(uploaded.splice(file));
      setUploaded( oldValues => {
          return oldValues.filter(file => file.name !== filename)
      })
    // console.log(` ${filename} sent to printer`)
    alert(`${filename} sent to printer`)

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
    <Box >
    <Container maxWidth="sm">
      <>
        {" "}
        <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()} > {" "} <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />{" "} <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""} > {" "} <div> {" "} <p>DRAG AND DROP FILES OR CLICK TO SELECT FILES</p>{" "} </div>{" "} </label>{" "} {dragActive && ( <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} ></div>)} </form> </>

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
          <h1>CLICK FILE NAME TO SEND IT TO THE PRINTER IN THAT ORDER</h1>
              {uploaded.map((file) =>
    <div  key={file.size+file.name}>
    <hr />
    <Box>
    <Container>
    <Button  
                      size="large"
                      color="success"
                      variant="contained"
                onClick={() => printItem(file.name)}>

    {file.name}
    </Button>
    </Container>
    </Box>
    </div>
  )}
              <hr />
              {" "} </>
            ) : (
              <>
          <h1>UPLOAD THE FOLLOWING FILES TO THE SERVER</h1>
    <Container>
              {listItems}
    </Container>
              <hr />
              <br />
              <button className="uploadFile" onClick={UploadPdfFile}> UPLOAD FILES TO SERVER </button> </>
            )}
          </>
        )}
    </>
    </Container>
    </Box >
      </>
  );
}
