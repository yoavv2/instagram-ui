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

export { register, login, checkAvailabilityUser };
