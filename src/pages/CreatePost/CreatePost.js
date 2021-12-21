import React, { useEffect, useRef, useState, createContext } from "react";

import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as Dialog from "@radix-ui/react-dialog";

import "./CreatePost.scss";

import Exitbtn from "../../common/Exitbtn/Exitbtn";
import DropZoneCreate from "./DropZoneCreate/DropZoneCreate";
import ImageCrop from "./ImageCrop/ImageCrop";

import { create } from "../../service/post.service";
import { ReactComponent as Prev } from "../../images/prev.svg";

export const PostCreateContext = createContext([]);

function CreatePost() {
  const [aspectRatio, setAspectRatio] = useState(4 / 3);
  const [displayedImages, setDisplayedImages] = useState([]);

  const [images, setImages] = useState([]);

  const [body, setBody] = useState("");
  const [step, setStep] = useState(0);
  // const [isClicked, setIsClicked] = useState(false);

  const ref = useRef();

  // //* submiting the post
  const history = useHistory();
  const submit = async (e) => {
    if (images.length < 1) return;
    e.preventDefault();

    try {
      const formToSubmit = {
        images,
        body,
      };

      await create(formToSubmit).then(() => history.push("/"));
    } catch (err) {
      console.log(err);
    }
  };

  const settings = {
    draggable: false,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "carousel_create",
  };

  const handelNextPage = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    }
    return;
  };
  const handlePrev = () => {
    if (step === 1) return;
    setStep((prev) => prev - 1);
  };

  useEffect(() => {
    if (images.length > 0) {
      setStep((prev) => prev + 1);
    }
  }, [images]);

  const Croping = () => (
    <Slider {...settings}>
      {images.map((image, i) => (
        <div key={i} className="image_crop_wrap">
          <ImageCrop
            image={image}
            index={i}
            displayedImages={displayedImages[i]}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
          />
        </div>
      ))}
    </Slider>
  );

  const handleTextChange = (text) => {
    setBody(text);
  };
  const Postdescription = ({ images, handleTextChange }) => {
    const textAreaRef = useRef();
    const submitCaption = () => {
      const text = textAreaRef.current.value;
      handleTextChange(text);
    };
    return (
      <div className="post_description">
        <Slider {...settings}>
          {images.map((image, i) => (
            <div key={i} className="image_preview">
              <img src={image} alt="preview" style={{ maxWidth: 600 }} />
            </div>
          ))}
        </Slider>

        <Dialog.Root className="post_description__dialog_root">
          <Dialog.Trigger
            style={{
              all: "unset",
              width: "70%",
              color: "#0095f6",
              background: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
              padding: "0 15px",
              fontSize: 15,
              lineHeight: 1,
              fontWeight: 500,
              height: 30,
              boxShadow: `0 0 0 1px #dbdbdb`,
              cursor: "pointer",
            }}
          >
            <div>Write a caption...</div>
          </Dialog.Trigger>

          <Dialog.Overlay />
          <Dialog.Content
            className="dialog__content"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              borderRadius: 6,
              boxShadow:
                "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90vw",
              maxWidth: "450px",
              height: "35vh",
              padding: 25,
            }}
          >
            {/* <Dialog.Title></Dialog.Title> */}
            <Dialog.Description>Write a caption...</Dialog.Description>

            <textarea
              ref={textAreaRef}
              name="textArea"
              spellCheck="false"
              style={{
                all: "unset",
                width: "100%",
                flex: "1",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 4,
                padding: "0 10px",
                fontSize: 15,
                lineHeight: 1,
                color: "#262626",
                boxShadow: `0 0 0 1px #dbdbdb`,
                height: 400,
              }}
            />
            <Dialog.Close style={{ background: "#fff", all: "unset" }}>
              <button
                aria-label="Close"
                type="submit"
                onClick={submitCaption}
                style={{
                  all: "unset",
                  color: "#0095f6",
                  background: "#fff",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 4,
                  padding: "0 15px",
                  fontSize: 15,
                  lineHeight: 1,
                  fontWeight: 500,
                  height: 35,
                  boxShadow: `0 0 0 1px #dbdbdb`,
                  marginTop: 15,
                }}
              >
                Save changes
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    );
  };

  return (
    <PostCreateContext.Provider value={{ images, setImages, step, setStep }}>
      <div className="create_post__wrapper">
        <Exitbtn className="btn-exit" />

        <div className="creat_post__form">
          <div className="header">
            {step > 1 && (
              <button className={`btn_prev`} onClick={handlePrev}>
                <Prev className="icon_prev" />
              </button>
            )}
            <h3>Create post</h3>

            {step < 3 && (
              <button
                className={`btn_next ${step > 0}`}
                onClick={step > 0 ? handelNextPage : null}
              >
                Next
              </button>
            )}
          </div>
          <form className="create_form" onSubmit={submit}>
            {step == 0 && (
              <DropZoneCreate setDisplayedImages={setDisplayedImages} />
            )}
            {step == 1 && <Croping />}
            {step >= 2 && (
              <Postdescription
                images={images}
                handleTextChange={handleTextChange}
              />
            )}
            {step == 3 && (
              <button type="submit" className={`btn_share`}>
                share
              </button>
            )}
          </form>
        </div>
      </div>
    </PostCreateContext.Provider>
  );
}

export default CreatePost;
