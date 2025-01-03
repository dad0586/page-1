import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../GenreInner/GenreInner.scss"; // Assuming you have a separate SCSS file for styling
import { Pagination } from "@mui/material";

function GenreInner() {
  const { id } = useParams(); // Get genre ID from the URL params
  const [movies, setMovies] = useState([]); // Movies related to the genre
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [genreName, setGenreName] = useState(""); // State for genre name

  const fetchMoviesByGenre = async (page = 1) => {
    try {
      const moviesResponse = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=0c43f3a99dd87115bcb9db112a118c03&with_genres=${id}&page=${page}`
      );
      setMovies(moviesResponse.data.results); // Set the movies for the genre
      setTotalPages(moviesResponse.data.total_pages); // Update total pages based on API response
    } catch (error) {
      console.log("Error fetching genre data:", error);
    }
  };

  const fetchGenreName = async () => {
    try {
      const genreResponse = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=0c43f3a99dd87115bcb9db112a118c03&language=en-US`
      );
      const genre = genreResponse.data.genres.find((g) => g.id === parseInt(id));
      if (genre) {
        setGenreName(genre.name); // Set the genre name based on the ID
      }
    } catch (error) {
      console.log("Error fetching genre name:", error);
    }
  };

  useEffect(() => {
    fetchMoviesByGenre(currentPage); // Fetch movies when the component mounts or page changes
    fetchGenreName(); // Fetch genre name when the component mounts
  }, [id, currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Update the current page when pagination is clicked
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <div className="genreinner">
      <h1>{genreName} Movies</h1> 
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
              </Link> {/* Wrap img and title with Link */}
            </div>
          ))
        ) : (
          <p>No movies found for this genre.</p>
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

export default GenreInner;
