import React from "react";
import "./Avatar.scss";

function Avatar(props) {
  const { iconSize, image } = props;

  return (
    <div>
      <img className={`avatar  ${iconSize}`} src={image} alt="profile" />
    </div>
  );
}

export default Avatar;
