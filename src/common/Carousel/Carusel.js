import React from "react";
import config from "../../config";
import "./Carousel.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.scss";

function Carousel({ images }) {
  const settings = {
    draggable: true,
    accessibility: true,
    lazyLoad: true,
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    useCSS: true,
    // slidesToShow: 1,
    // slidesToScroll: 1,
  };
  return (
    <div className="container">
      <Slider {...settings}>
        {images.map((image, i) => (
          <img key={i} src={config.apiUrl + "/" + image} alt="" />
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
