import React from "react";
import "./Avatar.scss";

function Avatar(props) {
  const { image } = props;

  let profileImage = image;
  return (
    <div>
      <img className={`avatar `} src={profileImage} alt="profile" />
    </div>
  );
}

export default Avatar;
