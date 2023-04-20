import React, { useEffect, useState, useRef } from "react";

import "./UploadPDFLables.css";

export default function DragDropFile() {
  const [file, setFile] = useState();
  const [dragActive, setDragActive] = React.useState(false);
  const inputRef = React.useRef(null);

  const UploadPdfFile = async () => {
    const formData = new FormData();
    formData.append("file", file);
    fetch(`${process.env.REACT_APP_API_URL}/upload_pdf`, {
      method: "POST",
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // },
      body: formData
    //     console.log(file.name);
    // fetch(`${process.env.REACT_APP_API_URL}/upload_pdf`, {
    // method: "POST",
    //   body: file
    })
    .then((res) => res.json())
    .then((result) => {
        // console.log(uploaded);
      setUploaded(result);
      }
    );
  };
        // 'Content-Type': 'multipart/form-data'

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
  };

  return (
    {file != null ? <> <h1> {file.name} </h1> <button className="uploadFile" onClick={UploadPdfFile}> Upload to server </button> <button className="showFile" onClick={ShowFile}> Show File </button> </>

      : <><form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()} > <input ref={inputRef} type="file" id="input-file-upload" multiple={false} onChange={handleChange} /> <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""} > <div> <p>Drag and drop your file here or</p> <button className="upload-button" onClick={onButtonClick}> Upload a file </button> </div> </label> {dragActive && ( <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} ></div>)} </form></>
    }
      </>
  );
}
