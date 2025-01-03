import React, { useEffect, useState, useRef } from "react";
import "../../pages/zeropage/zeropage.scss";
import "../../styles/general.scss";
import Logo from "../../assets/icons/itv.svg";
import { Link } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import axios from "axios";

function Zeropage() {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [active, setActive] = useState(false);
  const searchRef = useRef(null); // Ref for the entire search container

  // Fetch data based on search input
  useEffect(() => {
    if (value) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=0c43f3a99dd87115bcb9db112a118c03&query=${value}`
        )
        .then((response) => {
          setData(response?.data?.results || []);
          setActive(true); // Show results when data is fetched
        })
        .catch((error) => {
          console.log("Error fetching data:", error);
        });
    } else {
      setActive(false); // Close search results if input is cleared
    }
  }, [value]);

  // Detect clicks outside the search pane to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setActive(false); // Close the search results if clicked outside
      }
    };

    // Attach event listener to detect outside clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  // Handle movie click to close search results and clear the search input
  const handleMovieClick = () => {
    setActive(false);
    setValue("");
  };

  return (
    <div className="zeropage">
      <div className="center">
        <img src={Logo} alt="Logo" />

        {/* Search Pane */}
        <div ref={searchRef} className={active ? "search active" : "search"}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              value={value} // Controlled input
              onChange={(e) => setValue(e.target.value)}
              variant="outlined"
              placeholder="Enter Movies or Series name"
              style={{ flex: 1 }}
            />
            <Button variant="contained" onClick={() => setActive(true)}>
              Search
            </Button>
          </div>

          {/* Display movie search results */}
          {active && data.length > 0 && (
            <div className="search-results">
              {data.map((movie, index) => (
                <div className="movie-card" key={index}>
                  <Link to={`/movie/${movie.id}`} onClick={handleMovieClick}>
                    <img
                      src={
                        movie?.poster_path
                          ? "https://image.tmdb.org/t/p/w500" + movie?.poster_path
                          : "https://via.placeholder.com/500x750"
                      }
                      alt={`${movie.title} Poster`}
                    />
                    <div className="titles">
                      <h1>{movie.title}</h1>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="below-centr">
          <h6>
            ITV.to - Just a better place for watching online movies for free!
          </h6>
          <button>
            <Link to="/home"> Go to home page</Link>
          </button>
        </div>
      </div>

      <div className="text container">
        <span>ITv - Watch Free Movies Online</span>
        <p>
        Welcome to ITv – your gateway to movies! Powered by the IMDb API, ITv lets you explore films, actors, ratings, and more with ease. Built to showcase dynamic web development, ITv offers a sleek, responsive design for all devices.
        </p>
      </div>
    </div>
  );
}

export default Zeropage;
