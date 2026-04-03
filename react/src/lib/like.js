import { api } from "./api";

export const likeAPI = {
  // Use 'id' as the variable name
  like: (id) => api.post(`/api/card/${id}/like`),
  unlike: (id) => api.post(`/api/card/${id}/unlike`),
};
