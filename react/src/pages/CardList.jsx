import React, { useEffect, useState } from "react";
import { api } from "../lib/api";import '../App.css';
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
    <div className="search-container">
  <label htmlFor="search" className="search-label">Search Products</label>
  <input
    type="text"
    className="search-input"
    onChange={(e) => setSearch(e.target.value)}
    value={search}
    placeholder="Type to search..."
  />
  <ul className="search-results">
    {cards.length > 0 && cards.map((e) => (
      <li key={e.id} className="search-item">
        <h4>{e.title}</h4>
      </li>
    ))}
  </ul>
</div>
  );
};

export default CardList;
