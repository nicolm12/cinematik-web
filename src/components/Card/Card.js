
import React from "react";
import './Card.css';

const Card = ({ movieId, urlImage, movieTitle, onClick }) => {
  return (
    <div className="card" key={movieId}  onClick={onClick}>
      <img src={urlImage} alt={movieTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }}   />
      <div className="title"><h3>{movieTitle}</h3></div>
      
    </div>
  );
};

export default Card;