import axios from "axios";

const url = "https://localhost:5000"

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export const register = async (user) => {
    try {
        const res = await axios.post(`${url}/auth/register`, user)
        return { verified: true, ...res.data };
    } catch (error) {
        return { verified: false, error: error.response.data };
    }
}

export const login = async (user) => {
    try {
        const res = await axios.post(`${url}/auth/login`, user);
        return { verified: true, ...res.data };
      } catch (error) {
        return { verified: false, error: error.response.data };
      }
}

export const getUser = async () => {
    try {
        const res = await axios.get(`${url}/auth/user`);
        return { verified: true, data: toCamelCase(res.data) };
      } catch (error) {
        return { verified: false, error: error.response.data };
      }
}

export const updateUser = async (data) => {
  try {
    const res = await axios.patch(`${url}/auth/user`, {
      username: data.username,
      email: data.email
            // full_name: data.fullName,
    });

    return { success: true, data: toCamelCase(res.data) };
  } catch (error) {
    return { success: false, error: error.response.data };
  }
};


// Change object keys from snake_case to camelCase
const toCamelCase = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    const newKey = key
      .split("_").map((word, i) => (i > 0 ? word[0].toUpperCase() + word.slice(1) : word)).join("");
    newObj[newKey] = obj[key];
  });
  return newObj;
};
