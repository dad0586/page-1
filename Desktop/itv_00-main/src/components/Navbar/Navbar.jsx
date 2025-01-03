import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import SearchBar from "@mkyy/mui-search-bar";
import Logo from "../../assets/icons/itv.svg";
import "../Navbar/Navbar.scss";
import "../../styles/general.scss";
import Genres from "../../pages/Genres/Genres"; // Make sure the path is correct

const Navbar = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [active, setActive] = useState(false);
  const searchResultsRef = useRef(null); // Create a ref for the search results
  const genresRef = useRef(null); // Create a ref for the genres box

  const [showGenres, setShowGenres] = useState(false); // State to toggle Genres box

  const handleGenresClick = () => {
    setShowGenres((prev) => !prev); // Toggle visibility on click
  };

  const handleSearch = () => {
    console.log("Searching for:", value);
  };

  useEffect(() => {
    if (value) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=0c43f3a99dd87115bcb9db112a118c03&query=${value}`
        )
        .then((response) => {
          setData(response?.data?.results);
          setActive(true);
        })
        .catch((error) => {
          console.log("Error fetching data:", error);
        });
    } else {
      setActive(false); // Close search results if value is empty
    }
  }, [value]);

  const handleClickOutsideSearch = (e) => {
    if (searchResultsRef.current && !searchResultsRef.current.contains(e.target)) {
      setActive(false); // Close the search results
      setValue(""); // Clear the search input
    }
  };

  const handleClickOutsideGenres = (e) => {
    if (genresRef.current && !genresRef.current.contains(e.target)) {
      setShowGenres(false); // Close the genres box
    }
  };

  useEffect(() => {
    // Add event listeners for clicks outside of the search results and genres box
    document.addEventListener("click", handleClickOutsideSearch);
    document.addEventListener("click", handleClickOutsideGenres);

    return () => {
      document.removeEventListener("click", handleClickOutsideSearch); // Clean up the event listener for search results
      document.removeEventListener("click", handleClickOutsideGenres); // Clean up the event listener for genres
    };
  }, []);

  // New function to handle movie selection
  const handleMovieClick = () => {
    setActive(false); // Close the search results
    setValue(""); // Clear the search input
  };

  return (
    <div className="navbar container">
      <div className="left">
        <Link to="/">
          <img width="100px" height="50px" src={Logo} alt="IT_v Logo" />
        </Link>
      </div>

      <div className="middle">
        <Link to="/home">Home</Link>
        <Link onClick={handleGenresClick} to="/genres">Genres</Link>
        {showGenres && (
          <div ref={genresRef}>
            <Genres onClose={() => setShowGenres(false)} />
          </div>
        )}
        <Link to="/country">Country</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/tvseries">TV-Series</Link>
        <Link to="/imdb">Top IMDb</Link>
      </div>

      <div className="right">
        <div className="search">
          <SearchBar
            value={value}
            onChange={(newValue) => setValue(newValue)}
            onRequestSearch={handleSearch}
            placeholder="Enter Movies or Series name"
            style={{ flex: 1, width: "250px" }}
          />
          <Button variant="contained" onClick={handleSearch} style={{ marginLeft: "10px" }}>
            Search
          </Button>
        </div>

        <div ref={searchResultsRef} className={active ? "search-results active" : "search-results"}>
          {data.map((movie, index) => (
            <div className="movie-card" key={index}>
              <Link to={`/movie/${movie.id}`} onClick={handleMovieClick}>
                <img
                  src={"https://image.tmdb.org/t/p/w500" + movie?.poster_path}
                  alt={`${movie.title} Poster`}
                />
                <div className="titles">
                  <h1>{movie.title}</h1>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
