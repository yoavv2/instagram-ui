import config from "../config/index";

async function create(form) {
  // console.log("form data : ", post);

  const token = localStorage.getItem("token");
  const res = await fetch(config.apiUrl + "/post", {
    method: "POST",
    body: form,
    headers: {
      Authorization: token,
    },
  });
  return res.json();
}

async function getFeed() {
  const res = await fetch(config.apiUrl + "/post");
  return res.json();
}

async function getPosts(username) {
  const token = localStorage.getItem("token");
  if (!token) return [];
  const res = await fetch(config.apiUrl + "/post/" + username, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  return res.json();
}

export { create, getFeed, getPosts };
