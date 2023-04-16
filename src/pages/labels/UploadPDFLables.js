import React from "react";
import "./UploadPDFLables.css";


export default function UploadPdfLabel() {
  const [dragActive, setDragActive] = React.useState(false);

  //ref
const inputRef = React.useRef(null);
//...
  
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
  
  // triggers the input when the button is clicked
const onButtonClick = () => {
  inputRef.current.click();
};
  
  return (
    <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
// add the ref to the input
<input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
      <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
        <div>
          <p>Drag and drop your file here or</p>
          <button className="upload-button">Upload a file</button>
<button className="upload-button" onClick={onButtonClick}>Upload a file</button>
        </div> 
</label>
      { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
    </form>  );

};
