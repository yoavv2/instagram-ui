import React, { useMemo } from "react";
import Avatar from "../Avatar/Avatar";
import "./Post.scss";
import { Link } from "react-router-dom";
import config from "../../config/index";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function Post({ data }) {
  const createdAt = useMemo(() => {
    const date = new Date(data.createdAt);
    return months[date.getMonth()] + " " + date.getDate();
  }, [data.createdAt]);

  return (
    <div className="Post_wrapper">
      <article className="Post">
        <header>
          <div className="Post__user">
            <Avatar className="profileIcon" image="./images/avatar.png" />
            <Link to={"/profile/" + data.author.username}>
              <span className="Post__user__username">
                {data.author.username}
              </span>
            </Link>
          </div>
          <div className="Post__date">
            {/* <PostDate date={data.createdAt} /> */}
            {createdAt}
          </div>
        </header>
        <div className="Post__image">
          {/* <Link to={"/post/" + data._id}> */}
            <img
              src={config.apiUrl + "/" + data.image}
              className="Post__image"
              alt=""
            />
          {/* </Link> */}
        </div>
        <div className="Post__content">
          <h1 className="Post__description">{data.body}</h1>
        </div>
      </article>
    </div>
  );
}

export default Post;
