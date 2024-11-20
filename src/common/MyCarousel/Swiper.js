import React, { useState } from 'react';
import './Swiper.scss';
import config from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleRight,
  faChevronCircleLeft,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';

function Swiper({ images }) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  if (!Array.isArray(images) || images.length === 0) {
    return (
      <section className='Carousel'>
        <div className='slide active'>
          <img
            className='image'
            src='https://via.placeholder.com/300?text=No+image'
            alt='No image available'
          />
        </div>
      </section>
    );
  }

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };
  
  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const handleMouseDown = (e) => {
    setTouchStart(e.clientX || e.touches[0].clientX);
    setTouchEnd(e.clientX || e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    setTouchEnd(e.clientX || e.touches[0].clientX);
  };

  const handleMouseUp = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    }
    if (touchStart - touchEnd < -50) {
      prevSlide();
    }
  };

  const getImageUrl = (image) => {
    if (!image) return 'https://via.placeholder.com/300?text=No+image';
    return image.startsWith('http') ? image : `${config.apiUrl}/${image}`;
  };

  return (
    <section className='Carousel'>
      {images.map((image, i) => (
        <div className={i === current ? 'slide active' : 'slide'} key={i}>
          <img
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            draggable='false'
            className='image'
            src={getImageUrl(image)}
            alt={`Image ${i + 1} of ${images.length}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300?text=Image+not+found';
            }}
          />
        </div>
      ))}
      
      {images.length > 1 && (
        <>
          <FontAwesomeIcon
            className='right slide-arrow'
            icon={faChevronCircleRight}
            size='lg'
            color='#fefefe'
            onClick={nextSlide}
          />
          <FontAwesomeIcon
            className='left slide-arrow'
            icon={faChevronCircleLeft}
            size='lg'
            color='#fefefe'
            onClick={prevSlide}
          />
          <div className='dots'>
            {images.map((_, index) => (
              <FontAwesomeIcon
                onClick={() => setCurrent(index)}
                className={index === current ? 'dot active' : 'dot'}
                key={index}
                icon={faCircle}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Swiper;
