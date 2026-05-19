import React from "react";
import PropTypes from "prop-types";

function ToyCard({ toy, onDeleteToy, onUpdateToy, API_BASE_URL, setError }) {
  const { id, name, image, likes } = toy;

  async function handleDelete() {
    try {
      const response = await fetch(`${API_BASE_URL}/toys/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete toy");
      onDeleteToy(id);
      setError(null); // Clear error on successful delete
    } catch (error) {
      console.error("Error deleting toy:", error);
      setError(`Failed to delete "${name}". Please try again.`);
    }
  }

  async function handleLike() {
    try {
      const response = await fetch(`${API_BASE_URL}/toys/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: likes + 1 }),
      });
      if (!response.ok) throw new Error("Failed to update likes");
      const updatedToy = await response.json();
      onUpdateToy(updatedToy);
      setError(null); // Clear error on successful like
    } catch (error) {
      console.error("Error liking toy:", error);
      setError(`Failed to like "${name}". Please try again.`);
    }
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLike}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDelete}>
        Donate to GoodWill
      </button>
    </div>
  );
}

ToyCard.propTypes = {
  toy: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired,
  onDeleteToy: PropTypes.func.isRequired,
  onUpdateToy: PropTypes.func.isRequired,
  API_BASE_URL: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired,
};

export default ToyCard;
