import config from "../config/index";

async function register(user) {
  const res = await fetch(config.apiUrl + "/user", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

async function login({ username, password }) {
  
  const res = await fetch(`${config.apiUrl}/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
}
async function checkAvailabilityUser(username) {
  const res = await fetch(`${config.apiUrl}/user/available`, {
    method: "POST",
    body: JSON.stringify({ username }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const isAvailable = await res.json();
  return isAvailable;
}

async function me() {
  const token = localStorage.getItem("token");
  if (!token) {
    return {};
  }
  const res = await fetch(config.apiUrl + "/user/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return res.json();
}

async function getUser(username) {
  const token = localStorage.getItem("token");
  if (!token) {
    return {};
  }
  const res = await fetch(config.apiUrl + "/user/" + username, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return res.json();
}
async function search(query) {
  const res = await fetch(config.apiUrl + "/search/user/" + query, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  return res.json();
}

export { register, login, checkAvailabilityUser, me, getUser, search };
