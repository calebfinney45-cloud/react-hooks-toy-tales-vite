import React, { useState } from "react";
import PropTypes from "prop-types";

function ToyForm({ onAddToy, API_BASE_URL, setError }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/toys`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, likes: 0 }),
      });
      if (!response.ok) throw new Error("Failed to create toy");
      const newToy = await response.json();
      onAddToy(newToy);
      setFormData({ name: "", image: "" });
      setError(null);
    } catch (error) {
      console.error("Error adding toy:", error);
      let userMessage = "Failed to create toy. Please try again.";
      if (error.message === "Failed to create toy") {
        userMessage = "Could not create toy. The server responded with an error.";
      } else if (error instanceof TypeError) {
        userMessage = "Network error: Could not connect to the server. Please check your internet connection.";
      }
      setError(userMessage);
    }
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter a toy's name..."
          className="input-text"
        />
        <br />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Enter a toy's image URL..."
          className="input-text"
        />
        <br />
        <input type="submit" name="submit" value="Create New Toy" className="submit" />
      </form>
    </div>
  );
}

ToyForm.propTypes = {
  onAddToy: PropTypes.func.isRequired,
  API_BASE_URL: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired,
};

export default ToyForm;
