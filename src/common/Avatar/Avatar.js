import React from "react";
import PropTypes from "prop-types";
// import { createAvatar } from "@dicebear/avatars";
// import * as style from "@dicebear/avatars-bottts-sprites";
import "./Avatar.scss";

function Avatar(props) {
  const { iconSize, image, storyBorder } = props;

  return (
    <div className={storyBorder ? "storyBorder" : ""}>
      <div className="avatar_wrapp">
        <img className={`avatar  ${iconSize}`} src={image} alt="profile" />
        {/* <div
          dangerouslySetInnerHTML={{
            __html: createAvatar(style, { seed: }),
          }}
        /> */}
      </div>
    </div>
  );
}

Avatar.propTypes = {
  image: PropTypes.string,
  storyBorder: PropTypes.bool,
  iconSize: PropTypes.oneOf(["xsm", "sm", "md", "lg","xlg"]),
};

export default Avatar;
