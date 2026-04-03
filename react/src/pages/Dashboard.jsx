import React, { useContext, useEffect, useState } from "react";
import { useCard } from "../lib/useCard";
import { useNavigate } from "react-router-dom";
import CardForm from "../card/CardForm";
import { path } from "../routes/path";
import NotificationMenu from "./NotificationMenu";
import { AuthContext } from "../auth/AuthContext";
import { addToCart } from "../lib/cart";
import Cart from "./Cart";
import CardList from "./CardList";
import { likeAPI } from "../lib/like";
import CardItem from "./CardItem";
const Dashboard = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { deleteCard, createCards, loading, cards, err, setErr } = useCard();


  function handleCreate(payload) {
    setErr("");

    createCards(payload);
  }
  function handleDelete(e, id) {
    e.stopPropagation();
    setErr("");

    deleteCard(id);
  }
  function handleAddToCart(e, id) {
    e.stopPropagation(); // important (prevents navigation)
    addToCart(id);
  }
  return (
    <div>
      <div style={{ backgroundColor: "black", padding: "20px" }}>
        <h1 style={{ textAlign: "center", color: "red" }}>
          Dashboard For___ <span style={{ color: "yellow" }}>{user.name}</span>
        </h1>
      </div>
      <button onClick={() => logout()}>Logout </button>
      <CardList />
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

            {user.id == el.user_id ? (
              <button onClick={(e) => handleDelete(e, el.id)}>Delete</button>
            ) : null}

            {/* ✅ NEW BUTTON */}
            <button onClick={(e) => handleAddToCart(e, el.id)}>
              Add to Cart
            </button>
           <CardItem el={el}/>
          </li>
        ))}
      </ul>
      <NotificationMenu />
      <Cart />
    </div>
  );
};

export default Dashboard;
