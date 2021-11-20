import React, { useEffect, useRef, useState, createContext } from "react";

import { useHistory } from "react-router-dom";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "./CreatePost.scss";
import Exitbtn from "../../common/Exitbtn/Exitbtn";
import DropZoneCreate from "./DropZoneCreate/DropZoneCreate";
import ImageCrop from "./ImageCrop/ImageCrop";

import { create } from "../../service/post.service";
export const PostCreateContext = createContext([]);

function CreatePost() {
  const [displayedImages, setDisplayedImages] = useState([]);
  const history = useHistory();

  const [images, setImages] = useState([]);

  const [description, setDescription] = useState("");

  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      //* If the menu is open and the clicked target is not within the menu,
      //* then close the menu

      if (ref.current && !ref.current.contains(e.target)) {
        history.goBack();
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  });

  // //* submiting the post
  const submit = async (e) => {
    e.preventDefault();

    try {
      const formToSubmit = {
        // description,
        images,
      };
      await create(formToSubmit);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  const [aspectRatio, setAspectRatio] = useState(4 / 3);
  const aspects = [4 / 3, 16 / 9, 1 / 1];
  function getAspectLabel(aspect) {
    if (aspect === 4 / 3) {
      return "4 / 3";
    } else if (aspect === 16 / 9) {
      return "16 / 9";
    } else {
      return "1 / 1";
    }
  }
  const settings = {
    draggable: false,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "carousel",
  };
  console.log(`displayedImages => `, displayedImages);
  console.log(`images => `, images);
  return (
    <PostCreateContext.Provider value={{ images, setImages }}>
      <div className="create_post__wrapper">
        <Exitbtn />

        <div className="container" ref={ref}>
          <div className="creat_post__form">
            <h3 className="header">Create post</h3>
            <div className="border"></div>
            <form className="create_form" onSubmit={submit}>
              {images.length == 0 && (
                <DropZoneCreate setDisplayedImages={setDisplayedImages} />
              )}
              {images.length > 0 && (
                <Slider {...settings}>
                  {images.map((image, i) => (
                    <ImageCrop
                      key={i}
                      image={image}
                      index={i}
                      displayedImages={displayedImages[i]}
                      aspectRatio={aspectRatio}
                    />
                  ))}
                </Slider>
              )}
              {images.length > 0 && (
                <div className="controller">
                  <label htmlFor="aspect">Select an Aspect Ratio:</label>
                  <select
                    name="aspect"
                    id="aspect"
                    onChange={(e) =>
                      setAspectRatio(aspects[e.target.selectedIndex])
                    }
                  >
                    {aspects.map((aspect, i) => (
                      <option key={i} name="aspect" id="aspect">
                        {getAspectLabel(aspect)}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <button
                onClick={submit}
                type="submit"
                className="create_form__btn"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </PostCreateContext.Provider>
  );
}

export default CreatePost;
