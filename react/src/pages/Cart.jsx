import React, { useEffect, useState } from "react";
import { api } from "../lib/api";

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
    <div>
      <button onClick={() => setOpen(!open)}>
        🛒 <span style={{ color: "red" }}>{count}</span>
      </button>

      {open && (
        <ul>
          {cardItems.map((e) => (
            <li
              style={{ border: "1px solid red", marginTop: "5px" }}
              key={e.id}
            >
              {/* Make sure 'card' exists before accessing title */}
              {e.card?.title}
              <span style={{ color: "red" }}>
                each product price is- ${e.card?.new_price}
              </span>
              {/* Show the individual quantity for this item */}
              <span> (Qty: {e.quantity})</span>
              <span style={{ color: "blueviolet" }}>
                {e.quantity * e.card.new_price}$
              </span>
              
            </li>
          ))}
          <h2>Total: ${totalPrice}</h2>
          
        </ul>
      )}
    </div>
  );
};
export default Cart;
