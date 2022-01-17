import React from "react";

import "./IconsValidate.scss";
function IconsValidate(props) {
  return (
    <span>
      {props.isTouch ? (
        !props.err ? (
          <span className={"success-icon"}>
            <ion-icon name="checkmark-circle-outline"></ion-icon>
          </span>
        ) : (
          <span className={"err-icon"}>
            <ion-icon name="alert-circle-outline"></ion-icon>
          </span>
        )
      ) : null}
    </span>
  );
}

export default IconsValidate;
