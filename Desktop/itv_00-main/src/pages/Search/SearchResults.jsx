import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./SearchResults.scss"; // Add some styles if needed

const SearchResults = () => {
  const location = useLocation();
  const data = location.state?.searchData || []; // Get data from location state

  return (
    <div className="search-results-page container">
      <h2>Search Results</h2>
      {data.length > 0 ? (
        <div className="movies-list">
          {data.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default SearchResults;
