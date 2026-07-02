import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getDepartments = async (page, pageSize) => {
  return await API.get("/departments", {
    params: {
      page,
      pageSize,
    },
  });
};


export const getDepartment = async (id) => {
  return await API.get(`/${id}`);
};

export const addDepartment = async (department) => {
  return await API.post("/", department);
};

export const updateDepartment = async (id, department) => {
  return await API.put(`/${id}`, department);
};

export const deleteDepartment = async (id) => {
  return await API.delete(`/${id}`);
};

export default API;