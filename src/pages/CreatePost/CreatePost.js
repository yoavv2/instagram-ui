import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useHistory } from "react-router-dom";
import Exitbtn from "./Exitbtn/Exitbtn";

import "./CreatePost.scss";

import { ReactComponent as DragDrop } from "../../images/dragdrop.svg";
import { create } from "../../service/post.service";

function CreatePost() {
  const history = useHistory();
  const [image, setImage] = useState();

  const [step, setStep] = useState(0);
  const [body, setBody] = useState("");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setImage(acceptedFiles[0]);
    },
  });

  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      //* If the menu is open and the clicked target is not within the menu,
      //* then close the menu

      if (ref.current && !ref.current.contains(e.target)) {
        history.push("/");
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  });

  // //* submiting the post
  async function submit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("body", body);

      await create(formData);

      // setIsShown(false);
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="create_post__wrapper">
      <Exitbtn />

      <div className="container" ref={ref}>
        <div className="creat__post_form">
          <h3 className="header">Create post</h3>
          <div className="border"></div>
          <form
            className="create-form"

            // onSubmit={step === 1 && submit}
          >
            <div className="drag-drop-wrap">
              <div
                className="drag-area"
                {...getRootProps({ className: "dropzone" })}
              >
                <input
                  className="image-upload"
                  name="image"
                  {...getInputProps({
                    className: "dropzone",
                  })}
                  // onChange={(e) => {
                  //   // setFieldValue("image", e.currentTarget.files[0]);
                  //   console.log(`e.targ`, e.currentTarget.files[0]);
                  // }}
                />

                <DragDrop className="darg-area-icon" />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>
                    Drag 'n' drop some photos here, or click to select photo
                  </p>
                )}
                {image && (
                  <img src={URL.createObjectURL(image)} width="500px" />
                )}
              </div>

              <button type="submit" className="btn-create">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
