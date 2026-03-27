import React, { useState } from "react";

const CardForm = ({ onCreate }) => {
  const [data, setData] = useState({
    title: "",
    description: "",
    new_price: "",
    old_price: "",
    card_image: null,
  });

  function changeFunc(e) {
    const { name, value, type, files } = e.target;
    const val = type === "file" ? files[0] : value;
    setData((prev) => ({ ...prev, [name]: val }));
  }
  function submit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("new_price", data.new_price);
    formData.append("old_price", data.old_price);

    if (data.card_image) {
      formData.append("card_image", data.card_image);
    }

    onCreate(formData);


    setData({
      title: "",
      description: "",
      new_price: "",
      old_price: "",
      card_image: null,
    });

    e.target.reset();
  }
  return (
    <form onSubmit={submit}>
      <input type="file" name="card_image" id="" onChange={changeFunc} />
      <br />
      <input
        type="text"
        name="title"
        required
        placeholder="Title"
        id=""
        onChange={changeFunc}
      />
      <br />
      <textarea name="description" id="" onChange={changeFunc}></textarea>
      <br />
      <input type="number" name="old_price" id="" onChange={changeFunc} />
      <br />
      <input
        type="number"
        name="new_price"
        required
        id=""
        onChange={changeFunc}
      />
      <br />
      <button>Add Card</button>
    </form>
  );
};

export default CardForm;
