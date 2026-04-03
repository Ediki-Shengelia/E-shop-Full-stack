import React, { useEffect, useState } from "react";
import { notificationApi } from "../lib/notificationApi";
import { useNavigate } from "react-router-dom";
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
    <div>
      <button onClick={() => setOpen(!open)}>
        <span>🔔</span>
        <span>{unreadCount}</span>
      </button>
      {open && (
        <ul>
            <button style={{color:'red',cursor:"pointer"}} onClick={()=>markAllAsRead()}>Read all</button>
          {unread.map((e) => (
            <p key={e.id} style={{cursor:"pointer"}} onClick={()=>markAsRead(e.id)}>{e.message}</p>
          ))}
        </ul>
      )}
      
    </div>
  );
};

export default NotificationMenu;
