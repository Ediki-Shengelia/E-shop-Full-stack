import React, { useEffect, useState } from "react";
import { cardAPI } from "../card/temp";
import { useParams } from "react-router-dom";
import { useCard } from "../lib/useCard";
const ShowCard = () => {
  const { id } = useParams();
  const {addComment,cards}= useCard();
  const [err, setErr] = useState(null);
  const [card, setCard] = useState([]);
const [text,setText]=useState("");
  function submit(e){
    e.preventDefault();
    addComment(card.id,text)
    
    setText("")
    
  }
  async function fetchData() {
    try {
      const res = await cardAPI.show(id);
      setCard(res.data.data)
    } catch (error) {
      setErr(
        error.response.data.message || error.data || "Failed to fetch card",
      );
    }
  }
  useEffect(() => {
    fetchData();
  }, [id]);
  return <div>
    <p>{card.title}</p>
  <img style={{height:"400px"}} src={card.card_image} alt="" />
  <p>Old: {card.old_price}</p>
  <p>new : {card.new_price}</p>
  <p>{card.description}</p>
<div>
    <p>Comments:</p>
    {card.comments && card.comments.map((e) => (
        <p key={e.id}>
           <span style={{color:'red'}}> {e.user?.name}:</span>
          <span>
            {e.comment}
          </span>
         
        </p>
    ))}
</div>
  <form onSubmit={submit}>
    <textarea name="comment" id="" value={text} onChange={(e)=>setText(e.target.value)}></textarea>
    <button>comment</button>
  </form>
  </div>;
};

export default ShowCard;
