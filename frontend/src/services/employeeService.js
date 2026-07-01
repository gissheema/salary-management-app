import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/employees",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getEmployees = async (page, pageSize) => {
  return await API.get("/", {
    params: {
      page,
      pageSize,
    },
  });
};

export const getEmployee = async (id) => {
  return await API.get(`/${id}`);
};

export const addEmployee = async (employee) => {
  return await API.post("/", employee);
};

export const updateEmployee = async (id, employee) => {
  return await API.put(`/${id}`, employee);
};

export const deleteEmployee = async (id) => {
  return await API.delete(`/${id}`);
};

export default API;