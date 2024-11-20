import config from "../config/index";

function getAuthHeader() {
  const token = localStorage.getItem("token");
  console.log('Raw token from localStorage:', token);
  const authHeader = token ? `Bearer ${token}` : '';
  console.log('Generated auth header:', authHeader);
  return authHeader;
}

async function register(user) {
  try {
    const res = await fetch(config.apiUrl + "/user", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const contentType = res.headers.get('content-type');
      let error;
      if (contentType && contentType.includes('application/json')) {
        error = await res.json();
        console.error('Registration failed:', error);
      } else {
        const text = await res.text();
        console.error('Registration failed with non-JSON response:', text);
        error = { message: 'Server error' };
      }
      throw new Error(error.message || 'Failed to register');
    }
    return await res.json();
  } catch (err) {
    console.error('Registration error:', err);
    throw err;
  }
}

async function login({ username, password }) {
  try {
    const res = await fetch(`${config.apiUrl}/user/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!res.ok) {
      const contentType = res.headers.get('content-type');
      let error;
      if (contentType && contentType.includes('application/json')) {
        error = await res.json();
        console.error('Login failed:', error);
      } else {
        const text = await res.text();
        console.error('Login failed with non-JSON response:', text);
        error = { message: 'Server error' };
      }
      throw new Error(error.message || 'Failed to login');
    }
    
    const data = await res.json();
    console.log('Login response:', data);
    if (!data.token) {
      throw new Error('No token received from server');
    }
    return data;
  } catch (err) {
    console.error('Login error:', err);
    throw err;
  }
}

async function checkAvailabilityUser(username) {
  console.log('Checking username availability:', username);
  try {
    const res = await fetch(`${config.apiUrl}/user/available`, {
      method: "POST",
      body: JSON.stringify({ username }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) {
      const contentType = res.headers.get('content-type');
      let error;
      if (contentType && contentType.includes('application/json')) {
        error = await res.json();
        console.error('Username availability check failed:', error);
      } else {
        const text = await res.text();
        console.error('Username availability check failed with non-JSON response:', text);
        error = { message: 'Server error' };
      }
      throw new Error(error.message || 'Failed to check username availability');
    }
    return await res.json();
  } catch (err) {
    console.error('Username availability check error:', err);
    throw err;
  }
}

async function me() {
  console.log('me() service called');
  const authHeader = getAuthHeader();
  console.log('Auth header for /me request:', authHeader);
  
  if (!authHeader) {
    console.log('No auth header available');
    return {};
  }

  try {
    console.log('Making request to /user/me');
    const headers = {
      "Content-Type": "application/json",
      "Authorization": authHeader
    };
    console.log('Request headers:', headers);

    const res = await fetch(config.apiUrl + "/user/me", {
      method: "GET",
      headers: headers
    });
    
    console.log('Response status:', res.status);
    
    if (!res.ok) {
      const contentType = res.headers.get('content-type');
      let error;
      if (contentType && contentType.includes('application/json')) {
        error = await res.json();
        console.error('Me request failed:', error);
      } else {
        const text = await res.text();
        console.error('Me request failed with non-JSON response:', text);
        error = { message: 'Server error' };
      }
      throw new Error(error.message || 'Failed to get user data');
    }
    
    const data = await res.json();
    console.log('Me request successful:', data);
    return data;
  } catch (err) {
    console.error('Me request error:', err);
    throw err;
  }
}

async function getUser(username) {
  const token = localStorage.getItem("token");
  if (!token) {
    return {};
  }

  try {
    const res = await fetch(config.apiUrl + "/user/" + username, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const contentType = res.headers.get('content-type');
      let error;
      if (contentType && contentType.includes('application/json')) {
        error = await res.json();
        console.error('Get user request failed:', error);
      } else {
        const text = await res.text();
        console.error('Get user request failed with non-JSON response:', text);
        error = { message: 'Server error' };
      }
      throw new Error(error.message || 'Failed to get user data');
    }
    return await res.json();
  } catch (err) {
    console.error('Get user request error:', err);
    throw err;
  }
}

async function search(query) {
  try {
    const res = await fetch(config.apiUrl + "/search/user/" + query, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) {
      const contentType = res.headers.get('content-type');
      let error;
      if (contentType && contentType.includes('application/json')) {
        error = await res.json();
        console.error('Search request failed:', error);
      } else {
        const text = await res.text();
        console.error('Search request failed with non-JSON response:', text);
        error = { message: 'Server error' };
      }
      throw new Error(error.message || 'Failed to search users');
    }
    return await res.json();
  } catch (err) {
    console.error('Search request error:', err);
    throw err;
  }
}

async function follow(username) {
  try {
    const res = await fetch(config.apiUrl + "/user/" + username + "/follow", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) {
      const contentType = res.headers.get('content-type');
      let error;
      if (contentType && contentType.includes('application/json')) {
        error = await res.json();
        console.error('Follow request failed:', error);
      } else {
        const text = await res.text();
        console.error('Follow request failed with non-JSON response:', text);
        error = { message: 'Server error' };
      }
      throw new Error(error.message || 'Failed to follow user');
    }
    return await res.json();
  } catch (err) {
    console.error('Follow request error:', err);
    throw err;
  }
}

async function unfollow(username) {
  try {
    const res = await fetch(config.apiUrl + "/user/" + username + "/unfollow", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) {
      const contentType = res.headers.get('content-type');
      let error;
      if (contentType && contentType.includes('application/json')) {
        error = await res.json();
        console.error('Unfollow request failed:', error);
      } else {
        const text = await res.text();
        console.error('Unfollow request failed with non-JSON response:', text);
        error = { message: 'Server error' };
      }
      throw new Error(error.message || 'Failed to unfollow user');
    }
    return await res.json();
  } catch (err) {
    console.error('Unfollow request error:', err);
    throw err;
  }
}

async function updateAvatar(file) {
  console.log('Sending avatar update request with file:', file);
  const formData = new FormData();
  formData.append('avatar', file);

  try {
    console.log('Headers:', {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    
    const res = await fetch(`${config.apiUrl}/user/avatar`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!res.ok) {
      const contentType = res.headers.get('content-type');
      let error;
      if (contentType && contentType.includes('application/json')) {
        error = await res.json();
        console.error('Avatar update failed:', error);
      } else {
        const text = await res.text();
        console.error('Avatar update failed with non-JSON response:', text);
        error = { message: 'Server error' };
      }
      throw new Error(error.message || 'Failed to update avatar');
    }
    
    const data = await res.json();
    console.log('Avatar update response:', data);
    return data;
  } catch (err) {
    console.error('Avatar update error:', err);
    throw err;
  }
}

export {
  register,
  login,
  checkAvailabilityUser,
  me,
  getUser,
  search,
  follow,
  unfollow,
  updateAvatar
};
