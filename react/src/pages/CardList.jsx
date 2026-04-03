import React, { useEffect, useState } from "react";
import { api } from "../lib/api";
const CardList = () => {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  async function fetchCards() {
    setLoading(true);
    try {
      const res = await api.get("/api/card", { params: { search: search } });
      setCards(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(!search.trim()){
        setCards([]);
        setLoading(false);
        return;
    }
    fetchCards();
  
  }, [search]);
  return (
    <div>
      <label htmlFor="search">search</label>
      <input
        type="text"
        name="search"
        id="search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <div>
        {cards.length > 0 ? (
          cards.map((e) => (
            <li key={e.id}>
              <h4>{e.title}</h4>
            </li>
          ))
        ) : null}
      </div>
    </div>
  );
};

export default CardList;
