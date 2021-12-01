import React from "react";
import config from "../../config";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import "./MyCarousel.scss";

function MyCarousel({ images }) {
  return (
    <div className="carousel">
      <Carousel
        infiniteLoop={true}
        centerMode={true}
        showThumbs={false}
        showStatus={false}
        useKeyboardArrows={true}
        swipeable={true}
        // width="100%"
       
        centerSlidePercentage="100"
      >
        {images.map((image, i) => (
          <div key={i}>
            <img
              src={config.apiUrl + "/" + image}
              alt=""
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default MyCarousel;
