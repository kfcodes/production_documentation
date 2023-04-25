import React, { useEffect, useState, useRef } from "react";

import "./UploadPDFLables.css";

export default function DragDropFile() {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = React.useState(false);
  const inputRef = React.useRef(null);
  const [uploaded, setUploaded] = useState();
  const [printed, setPrinted] = useState();

  const UploadPdfFile = async () => {
    const formData = new FormData();
    formData.append("files", files);
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
    fetch(`${process.env.REACT_APP_API_URL}/print_pdf/${files}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.message);
        setPrinted(result.message);
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
    if (e.dataTransfer.files && e.dataTransfer.files) {
      setFiles(e.dataTransfer.files);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFiles(e.target.files);
    }
  };

  const handleSave = function (e) {
    // const onButtonClick = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);
      setFiles(e.target.files);
    }
  };

  const onButtonClick = function (e) {
    // inputRef.current.click();
    // console.log(inputRef.current.click());
    // console.log(inputRef.current.click());
    // e.preventDefault();
    // setFile(e.target.files[0]);
    setFiles(inputRef.current.click());
    console.log(files);
  };

  const ShowFile = function (e) {
    console.log(files);
    console.log(uploaded);
  };

  return (
    <>
      {printed != null ? (
        <>
          {" "}
          <h1>{printed}</h1>{" "}
        </>
      ) : (
        <>
          {uploaded != null ? (
            <>
              {" "}
              <h1>To Print {files} Click the button below</h1>{" "}
              <button className="printFile" onClick={printFile}>
                {" "}
                PRINT THE LABELS{" "}
              </button>{" "}
            </>
          ) : (
            <>
              {" "}
              {files.length  ? (
                <>
                  {" "}
                  <h1> To Upload {files} click the button below</h1>{" "}
                  <button className="uploadFile" onClick={UploadPdfFile}>
                    {" "}
                    UPLOAD FILE{" "}
                  </button>{" "}
                </>
              ) : (
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
                        <button
                          className="upload-button"
                          onClick={onButtonClick}
                        >
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
                  </form>{" "}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
