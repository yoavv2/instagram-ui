import config from "../config/index";
import { base64StringToBlob } from "blob-util";
async function create(post) {
  if (!post.images) return;
  const form = new FormData();
  console.log(post.images);
  // images are base64
  const imagesPromises = post.images.map(async (image) => {
    const cleanBase64 = image.split(";base64,").pop();
    return base64StringToBlob(cleanBase64, "image/jpeg");
    // console.log(cleanBase64);
    // const sentBlob = await fetch(cleanBase64);
    // return await sentBlob.blob();
  });
  Promise.all(imagesPromises).then(async (blobs) => {
    console.log(blobs);
    const files = blobs.map((blob, i) => {
      const imageFile = new File([blob], `image${i}`, { type: "image/jpeg" });
      console.log(`imageFile`, imageFile);
      form.append("images", imageFile);
    });
    // form.append("description", post.description);
    const res = await fetch(config.apiUrl + "/post", {
      method: "POST",
      body: form,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return res.json();
  });
}

async function getFeed() {
  const res = await fetch(config.apiUrl + "/post");

  return res.json();
}

async function getOnePost(postId) {
  const res = await fetch(config.apiUrl + "/post/" + postId, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return res.json();
}
async function getPosts(username) {
  const token = localStorage.getItem("token");
  if (!token) return [];

  const res = await fetch(config.apiUrl + "/user/" + username + "/post", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  return res.json();
}
function postLike(postId) {
  return fetch(config.apiUrl + "/post/" + postId + "/like", {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
}

function postUnlike(postId) {
  return fetch(config.apiUrl + "/post/" + postId + "/unlike", {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
}

async function getComments(postId) {
  const res = await fetch(config.apiUrl + "/post/" + postId + "/comment", {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return res.json();
}
async function createComment(postId, content) {
  console.log(`postId, content`, postId, content);
  const res = await fetch(config.apiUrl + "/post/" + postId + "/comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      content,
    }),
  });
  return res.json();
}

export {
  create,
  getFeed,
  getPosts,
  getOnePost,
  postLike,
  postUnlike,
  createComment,
  getComments,
};
