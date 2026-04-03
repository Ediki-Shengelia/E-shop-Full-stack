import React, { useState } from "react";
import { likeAPI } from "../lib/like";

const CardItem = ({ el }) => {
  // Use the values from your CardResource
  const [likeCount, setLikeCount] = useState(el.likes_count || 0);
  const [isLiked, setIsLiked] = useState(el.liked_by_me || false);

  async function likeLogic(e, id) {
    e.stopPropagation();

    try {
      // 1. Call the API
      const response = !isLiked ? await likeAPI.like(id) : await likeAPI.unlike(id);
      
      // 2. Log this to your console! 
      // This will tell you exactly where the data is.
      console.log("Server Response:", response);

      // 3. Extract the data. 
      // If your 'api' instance returns the raw axios object, it's response.data
      const result = response.data; 

      if (result) {
        setIsLiked(result.liked_by_me);
        setLikeCount(result.likes_count);
      }
      
    } catch (error) {
      // This will show you if the 500 error is still happening
      console.error("Like failed:", error.response?.data || error.message);
    }
  }

  return (
    <button onClick={(e) => likeLogic(e, el.id)} style={{ border: "none", cursor: "pointer", background: "none" }}>
      <span style={{ fontSize: "1.2rem" }}>{isLiked ? "❤️" : "🤍"}</span>
      <span style={{ marginLeft: "5px" }}>
        {likeCount} {likeCount === 1 ? "Like" : "Likes"}
      </span>
    </button>
  );
};

export default CardItem;