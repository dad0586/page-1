import React, { useEffect, useState } from "react";
import "../Top IMDb/IMDb.scss";
import "../../styles/general.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";

function IMDb() {
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=0c43f3a99dd87115bcb9db112a118c03&page=${currentPage}`
      )
      .then(function (response) {
        console.log("Total Pages:", response.data.total_pages); // Log total pages
        setData(response.data.results);
        setTotalPages(response.data.total_pages);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log("Error fetching data:", error);
        setError(error);
        setIsLoading(false);
      });
  }, [currentPage]);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Function to handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Update the page when pagination is clicked
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <div className="imdb container">
      <div className="movie">
        {data.map((movie, index) => (
          <div className="movie-card" key={index}>
            <Link to={`/movie/${movie.id}`}>
              <img
                src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                alt={`${movie.title} Poster`}
              />
              <div className="titles">
                <h1>{movie.title}</h1>
              </div>
            </Link>
          </div>
        ))}
        <div className="pagination">
          <Pagination
            count={totalPages} // Display total pages
            page={currentPage} // Current page number
            onChange={handlePageChange} // Page change handler
            shape="rounded"
          />
        </div>
      </div>
    </div>
  );
}

export default IMDb; 
