import { api } from "./api";

export async function addToCart(card_id, quantity = 1) {
  const token = localStorage.getItem("token"); // your saved token

  try {
    const res = await api.post(
      "api/cart/add",
      {
        card_id: card_id,
        quantity: quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}

