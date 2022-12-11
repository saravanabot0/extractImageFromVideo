import { React, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { ImUpload } from "react-icons/im";
import "./App.css";

function App() {
  const [downloadUrl, setDownloadUrl] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [captureImgBox, setCaptureImgBox] = useState(false);

  const canvasRef = useRef(null);

  var blobURL;

  const changeHandler = (event) => {

    if (event.target.files[0] === undefined) {
      setIsFilePicked(false);
      setCaptureImgBox(false);
    } else {
      setIsFilePicked(true);
    }

    console.log(event.target.files[0]);
    let file = event.target.files[0];
    blobURL = URL.createObjectURL(file);
    /*The URL.createObjectURL() static method creates a string containing a URL representing the object 
    given in the parameter.The URL lifetime is tied to the document in the window on which it was created. 
    The new object URL represents the specified File object or Blob object.*/
    console.log(blobURL);
    document.querySelector("video").src = blobURL;
  };


  const capture = () => {
    var canvas = document.getElementById("canvas");
    var video = document.getElementById("video");
    const width = +window
      .getComputedStyle(video, null)
      .getPropertyValue("width")
      .replace("px", "");
    const height = +window
      .getComputedStyle(video, null)
      .getPropertyValue("height")
      .replace("px", "");
    video.width = width;
    video.height = height;
    canvas.width = width;
    canvas.height = height;
    console.log(video);
    canvas
      .getContext("2d")
      .drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    console.log(canvas, "canvas");
    let canvasImg = canvasRef.current;
    console.log(canvasImg, "canvasImg");
    setCaptureImgBox(true);

    let tagA = document.createElement("a");
    setDownloadUrl(tagA);
    document.body.appendChild(tagA);
    tagA.href = canvas.toDataURL();
    console.log(tagA.href, "imgUrl");
  };

  console.log(downloadUrl, "Atag");

  const handleDownload = () => {
    downloadUrl.download = "canvas-image.png";
    downloadUrl.click();
  };

  return (
    <div className="App d-flex flex-column pt-5 align-items-center">
      <h1 className="mb-5 heading"> Upload Your Video and Extract Image From It... </h1>
      <div className="full-content-style">
      <form method="post" className="p-5 overallUploadBox">
        <div className="mb-2 bg-danger d-flex justify-content-center align-items-center chooseFile">
          <label
            htmlFor="file"
            className="fw-bold text-center h-100 w-100 p-4"
            style={{ cursor: "pointer" }}
          >
            {" "}
            <ImUpload size={25} className="mb-1 me-1" /> Upload Your File...{" "}
          </label>
          <input
            type="file"
            id="file"
            name="file"
            multiple
            style={{ display: "none" }}
            onChange={changeHandler}
          />
        </div>

        <video
          width="320"
          height="240"
          controls
          style={{ display: `${isFilePicked ? " block" : "none"}` }}
          className="mb-2"
          id="video"
        >
          Your browser does not support the video tag.
        </video>

        <div className="d-flex justify-content-center">
          <Button variant="warning"> Submit </Button>
          <Button
            variant="info"
            className="ms-2"
            onClick={capture}
            disabled={isFilePicked ? false : true}
          >
            Capture
          </Button>
        </div>
      </form>

      <div
        className="overallDrawnImg"
        style={{ display: `${captureImgBox ? "flex" : "none"}` }}
      >
        <p className="mb-0 pb-2 capturedTxt mt-5"> Captured Img... </p>
        <div className="drawnImagBox mb-2">
          <canvas id="canvas" ref={canvasRef}></canvas>
        </div>
        <Button variant="success" onClick={handleDownload}>
          Download Image
        </Button>
      </div>
      </div>
      
    </div>
  );
}

export default App;
