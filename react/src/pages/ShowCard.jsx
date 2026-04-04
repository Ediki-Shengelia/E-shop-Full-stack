import React, { useEffect, useState } from "react";
import { cardAPI } from "../card/temp";
import { useParams } from "react-router-dom";
import { useCard } from "../lib/useCard";
import "../App.css"
const ShowCard = () => {
  const { id } = useParams();
  const { addComment } = useCard();
  const [err, setErr] = useState(null);
  const [card, setCard] = useState({});
  const [text, setText] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    addComment(card.id, text);
    setText("");
  }

  async function fetchData() {
    try {
      const res = await cardAPI.show(id);
      setCard(res.data.data);
    } catch (error) {
      setErr(error.response?.data?.message || "Failed to fetch card");
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  if (err) return <div className="error-message">{err}</div>;

  return (
    <div className="show-card-container">
      {/* პროდუქტის დეტალები */}
      <div className="product-detail-section">
        <div className="image-column">
          <img className="full-product-img" src={card.card_image} alt={card.title} />
        </div>
        
        <div className="info-column">
          <h1 className="detail-title">{card.title}</h1>
          <div className="detail-prices">
            <span className="detail-old">${card.old_price}</span>
            <span className="detail-new">${card.new_price}</span>
          </div>
          <p className="detail-description">{card.description}</p>
        </div>
      </div>

      {/* კომენტარების სექცია */}
      <div className="comments-section">
        <h3 className="comments-heading">Comments ({card.comments?.length || 0})</h3>
        
        <div className="comments-list">
          {card.comments && card.comments.map((e) => (
            <div key={e.id} className="comment-bubble">
              <span className="comment-user">{e.user?.name}</span>
              <p className="comment-text">{e.comment}</p>
            </div>
          ))}
        </div>

        <form className="comment-form" onSubmit={submit}>
          <textarea 
            className="comment-textarea"
            placeholder="Write a comment..." 
            value={text} 
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button className="btn-comment">Post Comment</button>
        </form>
      </div>
    </div>
  );
};

export default ShowCard;