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
    <div className="form-wrapper">
      <form onSubmit={submit} className="card-form">
        <h3 className="form-title">Create New Post</h3>
        
        <div className="form-group">
          <label className="form-label">Product Image</label>
          <input type="file" name="card_image" className="file-input" onChange={changeFunc} />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="title"
            className="form-input"
            required
            placeholder="Title"
            onChange={changeFunc}
          />
        </div>

        <div className="form-group">
          <textarea 
            name="description" 
            className="form-textarea" 
            placeholder="Describe your product..." 
            onChange={changeFunc}
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <input 
              type="number" 
              name="old_price" 
              className="form-input" 
              placeholder="Old Price ($)" 
              onChange={changeFunc} 
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="new_price"
              className="form-input"
              required
              placeholder="New Price ($)"
              onChange={changeFunc}
            />
          </div>
        </div>

        <button type="submit" className="btn-submit">Add Card</button>
      </form>
    </div>
  );
};

export default CardForm;