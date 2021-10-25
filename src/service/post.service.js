import config from "../config/index";

async function create(post) {
  const token = localStorage.getItem("token");
  const res = await fetch(config.apiUrl + "/post", {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return res.json();
}

async function getFeed() {
  const res = await fetch(config.apiUrl + "/post");
  return res.json();
}

export { create, getFeed };
