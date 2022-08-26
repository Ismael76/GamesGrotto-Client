import axios from "axios";

const url = "http://localhost:5000"

export const register = async (user) => {
    try {
        const res = await axios.post(`${url}/register`, user)
        return { verified: true, ...res.data };
    } catch (error) {
        return { verified: false, error: error.response.data };
    }
}

export const login = async (user) => {
    try {
        const res = await axios.post(`${url}/login`, user);
        return { verified: true, ...res.data };
      } catch (error) {
        return { verified: false, error: error.response.data };
      }
}

export const getUser = async () => {
    try {
        const res = await axios.get(`${url}/user`);
        return { verified: true, data: res.data };
      } catch (error) {
        return { verified: false, error: error.response.data };
      }
}

export const updateUser = async (data) => {
    return data
}
