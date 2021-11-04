import React from "react";
import "./CardMenu.scss";
import { ReactComponent as Comment } from "../../images/comment.svg";
import { ReactComponent as Share } from "../../images/share.svg";
import { ReactComponent as Likes } from "../../images/notifications.svg";

function CardMenu() {
  return (
    <div className="card_menu">
      <Likes className="card_icon like" />
      <Comment className="card_icon" />
      <Share className="card_icon " />
    </div>
  );
}

export default CardMenu;
