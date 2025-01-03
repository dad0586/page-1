import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import '../CountryInner/CountryInner.scss';
import { Pagination } from "@mui/material";

// Map the country codes to TMDb's country codes
const countryToTmdbCodeMap = {
  USA: "US", // United States
  GBR: "GB", // United Kingdom
  CAN: "CA", // Canada
  AUS: "AU", // Australia
  NZL: "NZ", // New Zealand
  IRL: "IE", // Ireland
};

// Country names for display purposes
const countryNames = {
  USA: "United States",
  GBR: "United Kingdom",
  CAN: "Canada",
  AUS: "Australia",
  NZL: "New Zealand",
  IRL: "Ireland",
};

function CountryInner() {
  const { id } = useParams(); // Get country ID from the URL params (e.g., 'AUS', 'USA')
  const tmdbCountryCode = countryToTmdbCodeMap[id]; // Use mapping to get the TMDb country code
  const [movies, setMovies] = useState([]); // Movies related to the country
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [countryName, setCountryName] = useState(""); // State for country name

  const fetchMoviesByCountry = async (page = 1) => {
    try {
      const moviesResponse = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=0c43f3a99dd87115bcb9db112a118c03&with_origin_country=${tmdbCountryCode}&page=${page}`
      );
      setMovies(moviesResponse.data.results); // Set the movies for the country
      setTotalPages(moviesResponse.data.total_pages); // Update total pages based on API response
    } catch (error) {
      console.log("Error fetching country data:", error);
    }
  };

  const fetchCountryName = () => {
    setCountryName(countryNames[id] || "Country"); // Set the country name from the map
  };

  useEffect(() => {
    fetchMoviesByCountry(currentPage); // Fetch movies when the component mounts or page changes
    fetchCountryName(); // Fetch country name when the component mounts
  }, [id, currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Update the current page when pagination is clicked
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <div className="countryinner">
      <h1>{countryName} Movies</h1>
      <div className="movie">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
              </Link>
            </div>
          ))
        ) : (
          <p>No movies found for this country.</p>
        )}
      </div>
      <div className="pagination">
        <Pagination
          count={totalPages} // Display total pages
          page={currentPage} // Current page number
          onChange={handlePageChange} // Page change handler
          shape="rounded"
        />
      </div>
    </div>
  );
}

export default CountryInner;
