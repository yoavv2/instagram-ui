import config from "../config/index";
import { base64StringToBlob } from "blob-util";

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? `Bearer ${token}` : '';
}

async function create(post) {
  if (!post.images) return;
  const form = new FormData();
  // console.log(post.images);
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
      // console.log(`imageFile`, imageFile);
      form.append("images", imageFile);
    });
    form.append("body", post.body);
    const res = await fetch(config.apiUrl + "/post", {
      method: "POST",
      body: form,
      headers: {
        Authorization: getAuthHeader(),
      },
    });
    return res.json();
  });
}

async function getFeed() {
  const res = await fetch(config.apiUrl + "/post", {
    headers: {
      Authorization: getAuthHeader(),
    },
  });

  return res.json();
}

async function getOnePost(postId) {
  try {
    const res = await fetch(config.apiUrl + "/post/" + postId, {
      method: "GET",
      headers: {
        Authorization: getAuthHeader(),
      },
    });

    if (!res.ok) {
      console.error('Failed to fetch post:', res.status, res.statusText);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error fetching post:', err);
    return null;
  }
}

async function getPosts(username) {
  try {
    const res = await fetch(config.apiUrl + "/user/" + username + "/post", {
      method: "GET",
      headers: {
        Authorization: getAuthHeader(),
      },
    });
    
    if (!res.ok) {
      console.error('Failed to fetch posts:', res.status, res.statusText);
      throw new Error(`Failed to fetch posts: ${res.statusText}`);
    }
    
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error fetching posts:', err);
    throw err;
  }
}

async function postLike(postId) {
  return fetch(config.apiUrl + "/post/" + postId + "/like", {
    method: "POST",
    headers: {
      Authorization: getAuthHeader(),
    },
  });
}

async function postUnlike(postId) {
  return fetch(config.apiUrl + "/post/" + postId + "/unlike", {
    method: "POST",
    headers: {
      Authorization: getAuthHeader(),
    },
  });
}

async function getComments(postId) {
  const res = await fetch(config.apiUrl + "/post/" + postId + "/comment", {
    headers: {
      Authorization: getAuthHeader(),
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
      Authorization: getAuthHeader(),
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
  getComments,
  createComment,
};
