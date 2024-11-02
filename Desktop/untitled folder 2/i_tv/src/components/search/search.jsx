import React, { useState, useEffect } from "react";
import axios from "axios";
import "../search/search.scss";

const API_KEY = "41ee00ef54c639e104c9b60ce5d3736b";

const Search = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (query.length > 0) {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
          );
          setMovies(response.data.results.slice(0, 6)); // Limit results to 6
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      } else {
        setMovies([]);
      }
    };

    const timerId = setTimeout(fetchMovies, 300); // Debounce for 300ms
    return () => clearTimeout(timerId);
  }, [query]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      {movies.length > 0 && (
        <div className="search-results">
          {movies.map((movie) => (
            <div key={movie.id} className="search-card">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="search-card-image"
              />
              <div className="search-card-info">
                <h3 className="search-card-title">{movie.title}</h3>
                <p className="search-card-overview">{movie.overview.slice(0, 80)}...</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search
