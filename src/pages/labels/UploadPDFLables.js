import React, { useEffect, useState, useRef } from "react";

import './UploadPDFLables.css';

export default function DragDropFile() {
const [file, setFile] = useState();
  const [dragActive, setDragActive] = React.useState(false);
 const inputRef = React.useRef(null);
  
  const UploadPdfFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log("The file being uploaded is");
    console.log(file);
    // fetch(`${process.env.REACT_APP_API_URL}/upload_pdf`, {
    //   method: "post",
    //   mode: "cors",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "multipart/form-data",
    //   },
    // })
      // .then((res) => res.json())
      // .then(
      //   (result) => {
      //     console.log(result);
      //   }
      // );

  }
  
  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    console.log("The File being Dropped is:");
    console.log(e.dataTransfer.files);
    setFile(e.dataTransfer.files);
    }
  };
  
  const handleChange = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSave = function(e) {
  // const onButtonClick = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0])
      setFile(e.target.files[0])
    }
  };


  const onButtonClick = function(e) {
    // inputRef.current.click();
    console.log(inputRef.current.click());
    // console.log(inputRef.current.click());
    // e.preventDefault();
    // setFile(e.target.files[0]);
    // console.log(file);
  };

  const ShowFile = function(e) {
    console.log(file);
  };
  
  return (
    <>
    <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <input ref={inputRef} type="file" id="input-file-upload" multiple={false} onChange={handleChange} />
      <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
        <div>
          <p>Drag and drop your file here or</p>
          <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
        </div> 
      </label>
      { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
    </form>
          <button className="uploadFile" onClick={UploadPdfFile}>Upload to server</button>
          <button className="showFile" onClick={ShowFile}>Show File</button>
    </>
  );
};
