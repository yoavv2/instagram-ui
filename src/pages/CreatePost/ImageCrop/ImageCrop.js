import React, { useState, useCallback, useContext } from "react";
import "./ImageCrop.scss";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import "cropperjs/dist/cropper.css";
import { PostCreateContext } from "../CreatePost";

function ImageCrop({ displayedImages, index, aspectRatio }) {
  const { images, setImages } = useContext(PostCreateContext);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({});

  const cropComplete = useCallback(
    async (e) => {
      e.preventDefault();
      console.log("displayed", displayedImages);
      console.log("images1", images);
      const croppedImage = await getCroppedImg(
        displayedImages,
        croppedAreaPixels
      );
      const uploadedImages = images;
      uploadedImages[index] = croppedImage;
      setImages(uploadedImages);
      console.log("images2", uploadedImages);
    },
    [croppedAreaPixels, displayedImages, images, index, setImages]
  );
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  return (
    <div className="crop_container">
      <div>
        <Cropper
          className="crop"
          image={displayedImages}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>

      <button className="crop__done_btn" onClick={cropComplete}>
        Crop Image
      </button>
    </div>
  );
}

export default ImageCrop;
