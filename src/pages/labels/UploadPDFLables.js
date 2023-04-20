import React, { useEffect, useState, useRef } from "react";

import "./UploadPDFLables.css";

export default function DragDropFile() {
  const [file, setFile] = useState();
  const [dragActive, setDragActive] = React.useState(false);
  const inputRef = React.useRef(null);
  const [uploaded, setUploaded] = useState();
  const [printed, setPrinted] = useState();

  const UploadPdfFile = async () => {
    const formData = new FormData();
    formData.append("file", file);
    fetch(`${process.env.REACT_APP_API_URL}/upload_pdf`, {
      method: "POST",
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // },
      body: formData,
      //     console.log(file.name);
      // fetch(`${process.env.REACT_APP_API_URL}/upload_pdf`, {
      // method: "POST",
      //   body: file
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(uploaded);
        setUploaded(result);
      });
  };
  // 'Content-Type': 'multipart/form-data'

  const printFile = async () => {
    fetch(`${process.env.REACT_APP_API_URL}/print_pdf/${file.name}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPrinted(result);
      });
  };

  // console.log(`${process.env.REACT_APP_API_URL}/print_pdf/${file.name}`);
  // };

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
      // console.log("The File being Dropped is:");
      // console.log(e.dataTransfer.files);
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSave = function (e) {
    // const onButtonClick = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };

  const onButtonClick = function (e) {
    // inputRef.current.click();
    // console.log(inputRef.current.click());
    // console.log(inputRef.current.click());
    // e.preventDefault();
    // setFile(e.target.files[0]);
    setFile(inputRef.current.click());
    console.log(file);
  };

  const ShowFile = function (e) {
    console.log(file);
    console.log(uploaded);
  };

  return (
    <>
      {uploaded != null ? (
        <>
          <h1>To Print {file.name} Click the button below</h1>{" "}
          <button className="printFile" onClick={printFile}>
            PRINT THE LABELS
          </button>
        </>
      ) : (
      {uploaded != null ? (
        <>
          <h1>To Print {file.name} Click the button below</h1>{" "}
          <button className="printFile" onClick={printFile}>
            PRINT THE LABELS
          </button>
        </>
      ) : (
        <>
          {file != null ? (
            <>
              <h1> To Upload {file.name} click the button below</h1>{" "}
              <button className="uploadFile" onClick={UploadPdfFile}>
                UPLOAD FILE
              </button>
            </>
          ) : (
            <>
              <form
                id="form-file-upload"
                onDragEnter={handleDrag}
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  ref={inputRef}
                  type="file"
                  id="input-file-upload"
                  multiple={false}
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
                    <p>Drag and drop your PDF Label A5 file here or</p>{" "}
                    <button className="upload-button" onClick={onButtonClick}>
                      {" "}
                      Upload a file{" "}
                    </button>{" "}
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
              </form>
            </>
          )}
        </>
      )}
    </>
  );
}
