import React from "react";
import "./Popup.css";
import YouTube from "react-youtube"; 
import { RxCross2 } from "react-icons/rx";
import { BiSolidStar } from "react-icons/bi";

const Popup = ({
  isOpen,
  onClose,
  image,
  movie,
  trailer,
  movieTitle,
  movieOverview,
  relaseDate,
  vote,
  totalVotes
}) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div>
        {movie ? (
          <div className="content">
            <div>
              
              <img className="imagen" src={image} />
              
              <div className="information">
              <button className="popup-close" onClick={onClose}>
              <RxCross2 color="#011F26"/>
              </button>
                <h1 className="text-white">{movieTitle}</h1>
                <p className="text-white">{movieOverview}</p>
                <span><h3>Launch date: </h3> {" "}<p>{relaseDate}</p></span>
                <span><BiSolidStar /> <h3 className="votos">{vote} /10 </h3> <p> {totalVotes} votes</p></span>
                
              </div>
              
            </div>
            
          </div>
        ) : (
          "No encontrado"
        )}
      </div>
    </div>
  );
};

export default Popup;
