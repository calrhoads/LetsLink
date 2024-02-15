import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Button } from "../styles";

function MainPage({ user }) {
  const [randomUser, setRandomUser] = useState(null);

  useEffect(() => {
    fetchRandomUser();
  }, []);

  const fetchRandomUser = () => {
    fetch("/api/random_user")
      .then((response) => response.json())
      .then((data) => {
        setRandomUser(data);
      })
      .catch((error) => {
        console.error("Error fetching random user:", error);
      });
  };

  const handleMatch = () => {
    // Logic to send match data to backend API
    
    fetchRandomUser();
  };

  const handleNoMatch = () => {
    
    // Logic to send no match data to backend API
    
    fetchRandomUser();
  };

  return (
    <div>
      {randomUser && (
        <div className="userDiv">
          <h3>{randomUser.username}</h3>
          <img src={randomUser.profile_pic} alt="Profile" />
          <button onClick={handleMatch}>Match</button>
          <button onClick={handleNoMatch}>No Match</button>
        </div>
      )}
    </div>
  );
}

export default MainPage;
