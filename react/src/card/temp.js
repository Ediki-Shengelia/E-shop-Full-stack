import { api } from "../lib/api";

export const cardAPI = {
  list: () => api.get("api/card"),
  create: (payload) =>
    api.post("api/card", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  remove: (id) => api.delete(`api/card/${id}`),
  show: (id) => api.get(`api/card/${id}`),
  addComment: (payload) => api.post("api/comment/", payload),
};
