import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // sends cookies automatically
});


export const loginUser = async (data) => {
  const response = await API.post("/login", data);
  return response.data;
};

export const registerUser = async (data) => {
  const response = await API.post("/register", data);
  return response.data;
};

export const createTask = async (data) => {
  const response = await API.post("/createTask", data);
  return response.data;
};

export const getTasks = async (page = 1) => {

  const response = await API.get(`/getTasks?page=${page}`);

  return response.data;

};
export const getTaskById = async (id) => {
  const response = await API.get(`/task/${id}`);
  return response.data.task;
};

export const updateTask = async (id, data) => {
  const response = await API.put(`/${id}`, data);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await API.delete(`/${id}`);
  return response.data;
};