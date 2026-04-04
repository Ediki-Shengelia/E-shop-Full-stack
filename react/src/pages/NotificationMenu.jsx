import React, { useEffect, useState } from "react";
import { notificationApi } from "../lib/notificationApi";
import { useNavigate } from "react-router-dom";import '../App.css';
const NotificationMenu = () => {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const res = await notificationApi.NotificationList();
      setUnread(res.data.unread);
      setUnreadCount(res.data.unread_count);
    } catch (error) {
      setErr(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, []);
  async function markAsRead(id) {
    try {
      await notificationApi.ReadOne(id);
      setUnread((prev) => prev.filter((n) => n.id !== id));
      setUnreadCount((c) => Math.max(0, c - 1));
    } catch (error) {
      setErr(error.response.data.message);
    }
  }
  async function markAllAsRead() {
    try {
      await notificationApi.ReadAll();
      setUnread([]);
      setUnreadCount(0);
      setOpen(false);
    } catch (error) {
      setErr(error.response.data.message);
    }
  }
  return (
  <div className="notification-wrapper">
  <button className="notification-btn" onClick={() => setOpen(!open)}>
    <span className="bell-icon">🔔</span>
    {unreadCount > 0 && <span className="notif-count">{unreadCount}</span>}
  </button>
  
  {open && (
    <div className="notification-dropdown">
      <div className="notif-header">
        <span>Notifications</span>
        <button className="btn-read-all" onClick={() => markAllAsRead()}>Mark all as read</button>
      </div>
      <ul className="notif-list">
        {unread.map((e) => (
          <li key={e.id} className="notif-item" onClick={() => markAsRead(e.id)}>
            {e.message}
          </li>
        ))}
        {unread.length === 0 && <li className="notif-empty">No new notifications</li>}
      </ul>
    </div>
  )}
</div>
  );
};

export default NotificationMenu;
