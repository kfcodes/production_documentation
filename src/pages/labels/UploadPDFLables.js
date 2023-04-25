import React, { useEffect, useState, useRef } from "react";

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
    formData.append("files[]", file))
console.log(formData.getAll("files[]"))
    setUploaded(formData.getAll("files[]"));
    // fetch(`${process.env.REACT_APP_API_URL}/upload_pdf`, {
    //   method: "POST",
    //   // headers: {
    //   //   'Content-Type': 'multipart/form-data'
    //   // },
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then((result) => {
    //     setUploaded(result);
    //   });
  };

  const printFile = async () => {
    files.forEach((file) => 
    console.log(`${file.name} was printed`));
    // fetch(`${process.env.REACT_APP_API_URL}/print_pdf/${file.name}`, {
    //   method: "POST",
    // })
    //   .then((res) => res.json())
    //   .then((result) => {
    //     console.log(result.message);
    //     setPrinted(result.message);
    //   });
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
    if (e.target.files && e.target.files[0]) {
      setFiles([...files, ...e.dataTransfer.files]);
    }
  };

  const onButtonClick = function () {
    setFiles([...files, inputRef.current.click()]);
    // console.log(file);
  };

  const showFile = function (e) {
    // console.log(file);
    console.log(files);
    // console.log(uploaded);
  };

  return (
    <>
      {" "}
      <button className="printFile" onClick={showFile}>
        {" "}
        Show File
      </button>{" "}
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
          )}
        </form>
      </>
      <>
        {printed != null ? (<> <h1>{printed}</h1> </>) : (<> <h1> Not Printed </h1> </>)}
    </>

      <>
            {uploaded != null ? (
              <>
                <h1>To Print File Click the button below</h1>{" "}
                <button className="printFile" onClick={printFile}>
                  PRINT THE LABELS{" "}
                </button>{" "}
              </>
            ) : (
                <>
                  <h1> To Upload File click the button below</h1>
                  <button className="uploadFile" onClick={UploadPdfFile}>
                    UPLOAD FILE
                  </button>
                </>
            )}
          </>
      </>
  );
}


// {file != null ? (
//
      // <>
      //   {printed != null ? (
      //     <>
      //       {" "}
      //       <h1>{printed}</h1>{" "}
      //     </>
      //   ) : (
      //     <>
      //       {uploaded != null ? (
      //         <>
      //           {" "}
      //           <h1>To Print {file.name} Click the button below</h1>{" "}
      //           <button className="printFile" onClick={printFile}>
      //             {" "}
      //             PRINT THE LABELS{" "}
      //           </button>{" "}
      //         </>
      //       ) : (
      //         <>
      //           {" "}
      //           <>
      //             {" "}
      //             <h1> To Upload {file.name} click the button below</h1>{" "}
      //             <button className="uploadFile" onClick={UploadPdfFile}>
      //               {" "}
      //               UPLOAD FILE{" "}
      //             </button>{" "}
      //           </>
      //         </>
      //       )}
      //     </>
      //   )}
      // </>
