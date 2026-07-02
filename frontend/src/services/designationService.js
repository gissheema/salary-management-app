import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getDesignations = async (page, pageSize) => {
  return await API.get("/designations", {
    params: {
      all: true,
    },
  });
};


export const getDesignation = async (id) => {
  return await API.get(`/${id}`);
};

export const addDesignation = async (designation) => {
  return await API.post("/", designation);
};

export const updateDesignation = async (id, designation) => {
  return await API.put(`/${id}`, designation);
};

export const deleteDesignation = async (id) => {
  return await API.delete(`/${id}`);
};

export default API;