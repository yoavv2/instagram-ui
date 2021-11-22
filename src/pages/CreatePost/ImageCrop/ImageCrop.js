import React, { useState, useCallback, useContext } from "react";
import "./ImageCrop.scss";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import "cropperjs/dist/cropper.css";
import { PostCreateContext } from "../CreatePost";
import { ReactComponent as Ratio } from "../../../images/ratio.svg";
import { ReactComponent as OneOnOne } from "../../../images/1on1.svg";
import { ReactComponent as FourOnFive } from "../../../images/4on5.svg";
import { ReactComponent as SixOnNine } from "../../../images/16on9.svg";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

function ImageCrop({ displayedImages, index, setAspectRatio, aspectRatio }) {
  const { images, setImages } = useContext(PostCreateContext);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({});

  const aspects = [4 / 3, 4 / 5, 1 / 1];

  function getAspectLabel(aspect) {
    if (aspect === 4 / 3) {
      return "4 : 3";
    } else if (aspect === 4 / 5) {
      return "4 : 5";
    } else {
      return "1 : 1";
    }
  }

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
          image={displayedImages}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          style={{
            mediaStyle: { width: "400px", objectFit: "cover" },
            cropAreaStyle: { width: "100%" },
            containerStyle: { height: "auto" },
          }}
        />
      </div>
      <DropdownMenu.Root className="crop_actions">
        <DropdownMenu.Trigger
          className="crop_trigger"
          // onSelect={(e) => console.log(aspects[e.target.selectedIndex])}
        >
          <div className="ratio_btn">
            <Ratio className="ratio_btn__btn" />
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content side="top" align="start" className="crop_content">
          <DropdownMenu.Item
            className="crop_item"
            onSelect={() => setAspectRatio(aspects[2])}
          >
            <span> {getAspectLabel(aspects[2])}</span>
            <OneOnOne />
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="crop_item"
            onSelect={() => setAspectRatio(aspects[1])}
          >
            <span>{getAspectLabel(aspects[1])}</span> <FourOnFive />
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="crop_item"
            onSelect={() => setAspectRatio(aspects[0])}
          >
            <span> {getAspectLabel(aspects[0])} </span> <SixOnNine />
          </DropdownMenu.Item>
          <DropdownMenu.Arrow />
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <button className="crop__done_btn" onClick={cropComplete}>
        <ion-icon className="crop_icon" name="crop-outline"></ion-icon>
      </button>
    </div>
  );
}

export default ImageCrop;
