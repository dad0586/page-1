import React, { useEffect, useState } from "react";
import "../Home/Home.scss";
import "../../styles/general.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const [currentPage, setCurrentPage] = useState(1); // State for current page

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=0c43f3a99dd87115bcb9db112a118c03&page=${currentPage}`
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
    window.scrollTo(0, 0); // Scroll to the top of the page

    setCurrentPage(value); // Update current page when user interacts with pagination
  };

  return (
    <div className="home container">
      <div className="movie">
        {data.map((movie, index) => (
          <div className="movie-card" key={index}>
            <Link to={`/movie/${movie.id}`}>
              <div>
                <img
                  src={"https://image.tmdb.org/t/p/w500" + movie?.poster_path}
                  alt={`${movie.title} Poster`}
                />
              </div>
              <div className="titles">
                <h1>{movie.title}</h1>
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

export default Home;
