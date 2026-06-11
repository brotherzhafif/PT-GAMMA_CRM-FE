import { api } from "@/lib/axios";

export const getUsers = async () => {
  const res = await api.get("/api/users");
  return res.data;
};

export const createUser = async (payload) => {
  const res = await api.post("/api/users", payload);
  return res.data;
};

export const getUserById = async (id) => {
  const res = await api.get(`/api/users/${id}`);
  return res.data;
};

export const updateUserById = async (id, payload) => {
  const res = await api.put(`/api/users/${id}`, payload);
  return res.data;
};

export const deleteUserById = async (id) => {
  const res = await api.delete(`/api/users/${id}`);
  return res.data;
};
