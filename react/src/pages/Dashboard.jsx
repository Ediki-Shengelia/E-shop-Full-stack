import React, { useContext, useEffect, useState } from "react";
import { useCard } from "../lib/useCard";
import { useNavigate } from "react-router-dom";
import CardForm from "../card/CardForm";
import { path } from "../routes/path";
import NotificationMenu from "./NotificationMenu";
import { AuthContext } from "../auth/AuthContext";
const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { deleteCard, createCards, loading, cards, err, setErr } = useCard();
  const [deletingId, setDeletingId] = useState(null);
  function handleCreate(payload) {
    setErr("");

    createCards(payload);
  }
  function handleDelete(e, id) {
    e.stopPropagation();
    setErr("");

    deleteCard(id);
  }

  return (
    <div>
      Dashboard
      <button onClick={() => logout()}>Logout </button>
      <div>
        <CardForm onCreate={handleCreate} />
      </div>
      <ul>
        {cards.map((el) => (
          <li
            onClick={() => navigate(`/card/${el.id}`)}
            style={{ listStyle: "none" }}
            key={el.id}
          >
            <div>
              <div>
                <p>{el.title}</p>
                <img src={el.card_image} className="img" alt="" />
              </div>
              <div>
                <span className="old">{el.old_price}</span>
                <span className="new">{el.new_price}</span>
              </div>
            </div>
            <button onClick={(e) => handleDelete(e, el.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <NotificationMenu />
    </div>
  );
};

export default Dashboard;
