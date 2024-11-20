import React from "react";
import PropTypes from "prop-types";
import "./Avatar.scss";

function Avatar({ iconSize, image, storyBorder, onClick, style, className }) {
  const handleClick = (e) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div 
      className={`avatar-wrapper ${storyBorder ? "storyBorder" : ""}`}
      onClick={handleClick}
    >
      <img 
        className={`avatar ${iconSize} ${className || ''}`} 
        src={image} 
        alt="profile" 
        style={style}
      />
    </div>
  );
}

Avatar.propTypes = {
  image: PropTypes.string,
  storyBorder: PropTypes.bool,
  iconSize: PropTypes.oneOf(["xsm", "sm", "md", "lg", "xlg"]),
  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string
};

export default Avatar;
