import { useEffect, useState } from "react";
import { cardAPI } from "../card/temp";
export function useCard() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  async function fetchCard() {
    setLoading(true);
    setErr(null);
    try {
      const res = await cardAPI.list();
      setCards(res.data.data ?? res.data);
    } catch (error) {
      setErr(
        error.response.data.message || error.data || "failed to fetch Cards",
      );
    } finally {
      setLoading(false);
    }
  }
  async function createCards(payload) {
    const res = await cardAPI.create(payload);
    const newCard = res.data.data ?? res.data;
    setCards((prev) => [newCard, ...prev]);
    return newCard;
  }
  async function deleteCard(id) {
    setErr(null);
    await cardAPI.remove(id);
    setCards((prev) => prev.filter((p) => p.id !== id));
  }
  async function addComment(id, payload) {
    setErr("");
    try {
      const res = await cardAPI.addComment(id, {
        comment: payload,
      });
      const newComm = res.data.data ?? res.data;
      setCards((prev) => [...prev, newComm]);
    } catch (error) {}
  }
  useEffect(() => {
    fetchCard();
  }, []);
  return { deleteCard, createCards, loading, cards, err, setErr, addComment };
}
