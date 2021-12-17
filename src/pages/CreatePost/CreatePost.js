import React, { useEffect, useRef, useState, createContext } from "react";

import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CreatePost.scss";

import Exitbtn from "../../common/Exitbtn/Exitbtn";
import DropZoneCreate from "./DropZoneCreate/DropZoneCreate";
import ImageCrop from "./ImageCrop/ImageCrop";

import { create, getFeed } from "../../service/post.service";

export const PostCreateContext = createContext([]);

function CreatePost() {
  const [aspectRatio, setAspectRatio] = useState(4 / 3);
  const [displayedImages, setDisplayedImages] = useState([]);

  const [images, setImages] = useState([]);

  const [description, setDescription] = useState("");
  const [step, setStep] = useState(0);
  // const [isClicked, setIsClicked] = useState(false);

  const ref = useRef();

  // useEffect(() => {
  //   const checkIfClickedOutside = (e) => {
  //     //* If the menu is open and the clicked target is not within the menu,
  //     //* then close the menu

  //     if (ref.current && !ref.current.contains(e.target)) {
  //       history.goBack();
  //     }
  //   };

  //   document.addEventListener("mousedown", checkIfClickedOutside);

  //   return () => {
  //     // Cleanup the event listener
  //     document.removeEventListener("mousedown", checkIfClickedOutside);
  //   };
  // });

  // //* submiting the post
  const history = useHistory();
  const submit = async (e) => {
    if (images.length < 1) return;
    e.preventDefault();

    try {
      const formToSubmit = {
        images,
        description,
      };

      const created = await create(formToSubmit).then((res) =>
        console.log(`created`, res)
      );

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
  // console.log(`displayedImages => `, displayedImages);
  // console.log(`images => `, images);
  const handelNextPage = () => {
    console.log(`next step`);
    setStep((prev) => prev + 1);
  };

  useEffect(() => {
    if (images.length > 0) {
      setStep((prev) => prev + 1);
    }

  }, [images, description]);

  return (
    <PostCreateContext.Provider value={{ images, setImages, step, setStep }}>
      <div className="create_post__wrapper">
        <Exitbtn className="btn-exit" />

        <div className="creat_post__form">
          <div className="header">
            <h3>Create post</h3>

            <button
              className={`btn_next ${step > 0}`}
              onClick={step > 0 ? handelNextPage : null}
            >
              Next
            </button>

            {/* <Dialog.Close /> */}
          </div>
          <form className="create_form" onSubmit={submit}>
            {images.length == 0 && (
              <DropZoneCreate setDisplayedImages={setDisplayedImages} />
            )}
            {images.length > 0 && (
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
            )}

            <button type="submit" className={`create_form__btn ${step === 2}`}>
              Create
            </button>
          </form>
        </div>
      </div>
    </PostCreateContext.Provider>
  );
}

export default CreatePost;
