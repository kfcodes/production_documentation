import React, { useEffect, useState } from "react";

import './UploadPDFLables.css';

// drag drop file component
export default function DragDropFile() {
  // drag state
  const [dragActive, setDragActive] = React.useState(false);
  // ref
  const inputRef = React.useRef(null);

   const [pdf, setPdf] = useState([]);
  
  function createPallet1() {
    fetch(`${process.env.REACT_APP_API_URL}/upload_pdf`, {
      method: "post",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
        }
      );
  }
  
  // handle drag events
  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  // triggers when file is dropped
  const handleDrop = function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    setPdf(e.dataTransfer.files);
    console.log("Console logging from the handledrop function");
    console.log(e.dataTransfer.files);
      // handleFiles(e.dataTransfer.files);
    }
  };
  
  // triggers when file is selected with click
  const handleChange = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // handleFiles(e.target.files);
    }
  };


// triggers the input when the button is clicked
  const onButtonClick = () => {
    setPdf(inputRef.current.click());
    console.log("Console logging from the onButtonClick function");
    console.log(inputRef.current.click());
    console.log(pdf);
  };
  
  return (
    <>
    <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
      <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
        <div>
          <p>Drag and drop your file here or</p>
          <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
        </div> 
      </label>
      { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
    </form>
          <button className="uploadFile" onClick={createPallet1}>Upload to server</button>
    </>
  );
};
