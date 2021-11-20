import React, { useContext, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./DropZoneCreate.scss";
import { ReactComponent as DragDrop } from "../../../images/dragdrop.svg";
import { PostCreateContext } from "../CreatePost";

function DropZoneCreate({ setDisplayedImages }) {
  const { images, setImages } = useContext(PostCreateContext);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      // setImages(acceptedFiles);
      const acceptedFilesPromises = acceptedFiles.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          // reader.onerror = error => reject(error);
        });
      });
      const filesUrls = await Promise.all(acceptedFilesPromises);
      const arrayOfImages = [...images, ...filesUrls];
      const slicedArray = arrayOfImages.slice(0, 5);
      setImages(slicedArray);
      setDisplayedImages(slicedArray);
    },
    [images, setImages, setDisplayedImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: onDrop,
  });

  return (
    <div className="drag-drop-wrap">
      <div className="drag-area" {...getRootProps({ className: "dropzone" })}>
        <input
          className="image-upload"
          name="image"
          {...getInputProps({
            className: "dropzone",
          })}
        />
        <DragDrop className="darg-area-icon" />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some photos here, or click to select photo</p>
        )}
      </div>
    </div>
  );
}

export default DropZoneCreate;
