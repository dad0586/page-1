import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./main.scss";

const API_KEY = "41ee00ef54c639e104c9b60ce5d3736b"; // Replace with your TMDB API Key
const BASE_URL = "https://api.themoviedb.org/3";

const Filmlar = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=10`);
        setMovies(response.data.results || []);
      } catch (err) {
        setError("Error fetching movies.");
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container">
      {loading && <h1 className="loading">Loading...</h1>}
      {error && <h1 className="error">{error}</h1>}
      {!loading && !error && (
        <div className="cards1">
          {movies.map((movie) => (
            <div className="card1" key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="card-image1"
              />
              <h3 className="card-title1">{movie.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filmlar;