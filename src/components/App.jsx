import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const API_BASE_URL = "http://localhost:3001";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchToys() {
      try {
        const response = await fetch(`${API_BASE_URL}/toys`);
        if (!response.ok) throw new Error("Failed to fetch toys");
        const data = await response.json();
        setToys(data);
      } catch (error) {
        console.error("Error loading toys:", error);
      }
    }
    fetchToys();
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function onAddToy(newToy) {
    setToys([...toys, newToy]);
    setError(null);
  }

  function onDeleteToy(deletedToyId) {
    setToys(toys.filter((toy) => toy.id !== deletedToyId));
    setError(null);
  }

  function onUpdateToy(updatedToy) {
    setToys(toys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy)));
    setError(null);
  }

  return (
    <>
      <Header />
      {showForm ? (
        <ToyForm 
          onAddToy={onAddToy} 
          API_BASE_URL={API_BASE_URL} 
          setError={setError} 
        />
      ) : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      {error && (
        <div style={{ color: "red", textAlign: "center", margin: "10px" }}>
          {error}
        </div>
      )}
      <ToyContainer 
        toys={toys} 
        onDeleteToy={onDeleteToy} 
        onUpdateToy={onUpdateToy} 
        API_BASE_URL={API_BASE_URL} 
        setError={setError}
      />
    </>
  );
}

export default App;
