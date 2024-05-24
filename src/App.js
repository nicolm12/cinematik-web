import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Card from "./components/Card/Card";
import Header from "./components/Header/Header";
import Popup from "./components/Popup/Popup";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
function App() {
  const API_URL = "https://api.themoviedb.org/3/";
  const API_KEY = "352f5b841a1cb708de75fc54299aeb8c";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const URL_IMAGE = "https://image.tmdb.org/t/p/original/";
  //variables de estado
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [trailer, setTrailler] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(false);

  const fetchMovies = async (searchKey) => {
    try {
      const type = searchKey ? "search" : "discover";
      const {
        data: { results },
      } = await axios.get(`${API_URL}/${type}/movie`, {
        params: {
          api_key: API_KEY,
          query: searchKey,
        },
      });
      setMovies(results);
      setMovie(results[0]);
      setLoading(false);
      if (results.length) {
        await fetchCard(results[0].id);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    
      setLoading(false); 
      
      setMovies([]); 
    }
  };
  const fetchCard = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });
    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailler(trailer ? trailer : data.videos.results[0]);
    }
    setMovie(data);
  };
  const selectMovie = async (movie) => {
    fetchCard(movie.id);
    setMovie(movie);
    setPopup(true);
  };
  const closePopup = () => {
    setPopup(false); // Cierra el popup
  };

  const searchMovies = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchMovies(searchKey);
  };
  useEffect(() => {
    if (searchKey.trim() === "") {
      // Si no se ha ingresado ninguna palabra en la búsqueda
      setMovies([]); // Vacía la lista de películas
      setLoading(false); // Detiene la carga
      return;
    }
  
    // Realiza la búsqueda normalmente si se ha ingresado una palabra en la búsqueda
    setLoading(true); // Inicia la carga
    fetchMovies();
  }, [searchKey]);
  
  return (
    <div>
      <Header
        searchMovies={searchMovies}
        onChange={(e) => setSearchKey(e.target.value)}
      />

      <div className="Container-card">
        {loading ? (
          <div className="loading">
            <AiOutlineLoading3Quarters size={70} color="#fff" />
            <h1>Cargando...</h1>
          </div>
        ) : movies.length > 0 ? (
          movies.map((movie) => (
            <Card
              key={movie.id} // Provide a unique key for each element in the list
              movieId={movie.id}
              urlImage={`${URL_IMAGE}${movie.poster_path}`}
              movieTitle={movie.title}
              onClick={() => selectMovie(movie)}
            />
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
      <Popup
        isOpen={popup}
        onClose={closePopup}
        image={`${IMAGE_PATH}${movie.backdrop_path}`}
        movie={movie}
        trailer={trailer}
        movieTitle={movie.title}
        movieOverview={movie.overview}
        openTrailer={() => setPlaying(true)}
        relaseDate={movie.release_date}
        vote={movie.vote_average}
        totalVotes={movie.vote_count}
       

      />
    </div>
  );
}

export default App;
