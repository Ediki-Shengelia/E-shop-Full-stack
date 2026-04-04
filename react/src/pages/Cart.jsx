import React, { useEffect, useState } from "react";
import { api } from "../lib/api";
import '../App.css';
const Cart = () => {
  const [cardItems, setCartItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  const fetchCart = async () => {
    try {
      const response = await api.get("/api/cart");
      setCartItems(response.data.data);
      setCount(response.data.total_quantity);
    } catch (error) {
      console.error("Error fetching cart", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [cardItems]); // Empty array means "run only once on load"

  //!

  //!
  const totalPrice = cardItems.reduce((sum, item) => {
    return sum + item.quantity * (item.card?.new_price || 0);
  }, 0);

  return (
    <div className="cart-wrapper">
  <button className="cart-toggle" onClick={() => setOpen(!open)}>
    🛒 <span className="cart-badge">{count}</span>
  </button>

  {open && (
    <div className="cart-dropdown">
      <ul className="cart-list">
        {cardItems.map((e) => (
          <li className="cart-item" key={e.id}>
            <div className="cart-item-info">
              <span className="cart-item-title">{e.card?.title}</span>
              <span className="cart-item-price">${e.card?.new_price} x {e.quantity}</span>
            </div>
            <span className="cart-item-total">{e.quantity * e.card?.new_price}$</span>
          </li>
        ))}
      </ul>
      <div className="cart-footer">
        <h2 className="total-price">Total: ${totalPrice}</h2>
      </div>
    </div>
  )}
</div>
  );
};
export default Cart;
