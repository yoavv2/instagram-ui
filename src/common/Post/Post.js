import React, { useMemo } from "react";
import Avatar from "../Avatar/Avatar";
import "./Post.scss";
import { Link } from "react-router-dom";
// import PostDate from './PostDate/PostDate';

const imageSrc =
  "https://images.unsplash.com/photo-1634324040880-63dbf9a4e5ac?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80";
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
            <Avatar
              size="md"
              image={
                "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png"
              }
            />

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
          <Link to={"/post/" + data._id}>
            <img src={imageSrc} className="Post__image" alt="" />
          </Link>
        </div>
        <div className="Post__content">
          <h1 className="Post__description">{data.body}</h1>
        </div>
      </article>
    </div>
  );
}

export default Post;
