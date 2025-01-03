import React, { useEffect, useState } from "react";
import "../../styles/general.scss";
import '../TV-Series/TvSeries.scss';
import axios from "axios";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";

function TvSeries() {
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const [currentPage, setCurrentPage] = useState(1); // State for current page

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/airing_today?api_key=0c43f3a99dd87115bcb9db112a118c03&page=${currentPage}`
      )
      .then(function (response) {
        console.log(response);
        setData(response?.data?.results);
        setTotalPages(response?.data?.total_pages); // Set total pages from response
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log("Error fetching data:", error);
        setError(error);
        setIsLoading(false);
      });
  }, [currentPage]); // Trigger re-fetching when page changes

  // Function to handle pagination change
  const handlePageChange = (event, value) => {
    window.scrollTo(0, 0);
    setCurrentPage(value); // Update current page when user interacts with pagination
  };

  return (
    <div className="tvseries container">
      <div className="movie">
        {data.map((movie, index) => (
          <div className="movie-card" key={index}>
            <Link to={`/movie/${movie.id}`}>
              <img
                src={"https://image.tmdb.org/t/p/w500" + movie?.poster_path}
                alt={`${movie.name} Poster`}
              />
              <div className="titles">
                <h1>{movie.name}</h1>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="pagination">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
        />
      </div>
    </div>
  );
}

export default TvSeries;
