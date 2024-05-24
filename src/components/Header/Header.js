import React from "react";
import "./Header.css";
import { MdOutlineSearch } from "react-icons/md";

const Header = ({ searchMovies, onChange }) => {
  return (
    <div className='container'>
      <h1 className="title">Cinematik</h1>
      <form onSubmit={searchMovies}>
        <input
        className="search"
          type="text"
          placeholder="Search movie"
          onChange={onChange}
        ></input>
        <button className="button"><MdOutlineSearch color="#fff" size={25}/></button>
      </form>
    </div>
  );
};

export default Header;
