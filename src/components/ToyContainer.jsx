import React from "react";
import PropTypes from "prop-types";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onDeleteToy, onUpdateToy, API_BASE_URL, setError }) {
  const toyCards = toys.map((toy) => (
    <ToyCard
      key={toy.id}
      toy={toy}
      onDeleteToy={onDeleteToy}
      onUpdateToy={onUpdateToy}
      API_BASE_URL={API_BASE_URL}
      setError={setError}
    />
  ));

  return (
    <div id="toy-collection">{toyCards}</div>
  );
}

ToyContainer.propTypes = {
  toys: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
    })
  ).isRequired,
  onDeleteToy: PropTypes.func.isRequired,
  onUpdateToy: PropTypes.func.isRequired,
  API_BASE_URL: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired,
};

export default ToyContainer;
