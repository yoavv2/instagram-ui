import React, { useState } from "react";
import "./Swiper.scss";
import config from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleRight,
  faChevronCircleLeft,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

function Swiper({ images }) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const handleMouseDown = (e) => {
    setTouchStart(e.clientX);
    setTouchEnd(e.clientX);
  };

  const handleMouseMove = (e) => {
    setTouchEnd(e.clientX);
  };

  const handleMouseUp = (e) => {
    if (touchStart - touchEnd > 0) {
      nextSlide();
    }
    if (touchStart - touchEnd < 0) {
      prevSlide();
    }
  };

  return (
    <section className="Carousel">
      {images.length > 1 && (
        <div>
          <FontAwesomeIcon
            className="right slide-arrow"
            icon={faChevronCircleRight}
            size="lg"
            color="#fefefe"
            onClick={nextSlide}
          />
          <FontAwesomeIcon
            className="left slide-arrow"
            icon={faChevronCircleLeft}
            size="lg"
            color="#fefefe"
            onClick={prevSlide}
          />
        </div>
      )}
      {images.map((image, i) => {
        return (
          <div className={i === current ? "slide active" : "slide"} key={i}>
            {/* {i === current && ( */}
            <img
              onTouchStart={handleMouseDown}
              onTouchMove={handleMouseMove}
              onTouchEnd={handleMouseUp}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              draggable="false"
              className="image"
              src={config.apiUrl + "/" + image}
              alt={image.description}
            />
            {/*  )} */}
          </div>
        );
      })}
      {images.length > 1 && (
        <div className="dots">
          {images.map((_, index) => (
            <FontAwesomeIcon
              onClick={() => setCurrent(index)}
              className={index === current ? "dot active" : "dot"}
              key={index}
              icon={faCircle}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Swiper;
