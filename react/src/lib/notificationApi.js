import { api } from "./api";

export const notificationApi = {
  NotificationList: () => api.get("api/notifications"),
  ReadOne: (id) => api.post(`api/notifications/${id}/read`),
  ReadAll: () => api.post("api/notifications/readall"),
};
