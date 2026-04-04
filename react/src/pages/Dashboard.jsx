import React, { useContext, useEffect, useState } from "react";
import { useCard } from "../lib/useCard";
import { useNavigate } from "react-router-dom";
import CardForm from "../card/CardForm";
import { path } from "../routes/path";
import NotificationMenu from "./NotificationMenu";
import { AuthContext } from "../auth/AuthContext";
import { addToCart } from "../lib/cart";
import Cart from "./Cart";
import '../App.css';
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
  <div className="dashboard-container">
  <header className="dashboard-header">
    <h1 className="dashboard-title">
      Dashboard For <span>{user.name}</span>
    </h1>
    <button className="btn-logout" onClick={() => logout()}>Logout</button>
  </header>

  <div className="dashboard-content">
    <CardList />
    <CardForm onCreate={handleCreate} />
    
    <div className="cards-grid">
      {cards.map((el) => (
        <div key={el.id} className="product-card" onClick={() => navigate(`/card/${el.id}`)}>
          <div className="product-image-wrapper">
            <img src={el.card_image} className="product-img" alt={el.title} />
          </div>
          <div className="product-details">
            <p className="product-title">{el.title}</p>
            <div className="price-tag">
              <span className="price-old">${el.old_price}</span>
              <span className="price-new">${el.new_price}</span>
            </div>
          </div>
          <div className="product-actions">
            {user.id == el.user_id && (
              <button className="btn-delete" onClick={(e) => handleDelete(e, el.id)}>Delete</button>
            )}
            <button className="btn-add-cart" onClick={(e) => handleAddToCart(e, el.id)}>
              Add to Cart
            </button>
          </div>
          <CardItem el={el}/>
        </div>
      ))}
    </div>
  </div>
  
  <div className="floating-tools">
    <NotificationMenu />
    <Cart />
  </div>
</div>
  );
};

export default Dashboard;
