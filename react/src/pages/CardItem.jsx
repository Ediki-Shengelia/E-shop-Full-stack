import React, { useState } from "react";
import { likeAPI } from "../lib/like";
import "../App.css";
const CardItem = ({ el }) => {
  const [likeCount, setLikeCount] = useState(el.likes_count || 0);
  const [isLiked, setIsLiked] = useState(el.liked_by_me || false);
  const [isAnimating, setIsAnimating] = useState(false);

  async function likeLogic(e, id) {
    e.stopPropagation();
    
    // ანიმაციის ეფექტისთვის
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    try {
      const response = !isLiked ? await likeAPI.like(id) : await likeAPI.unlike(id);
      const result = response.data;

      if (result) {
        setIsLiked(result.liked_by_me);
        setLikeCount(result.likes_count);
      }
    } catch (error) {
      console.error("Like failed:", error.response?.data || error.message);
    }
  }

  return (
    <div className="card-interactions">
      <button 
        onClick={(e) => likeLogic(e, el.id)} 
        className={`like-button ${isLiked ? 'is-liked' : ''} ${isAnimating ? 'pulse' : ''}`}
      >
        <span className="heart-icon">{isLiked ? "❤️" : "🤍"}</span>
        <span className="like-text">
          {likeCount} {likeCount === 1 ? "Like" : "Likes"}
        </span>
      </button>
    </div>
  );
};

export default CardItem;