import axios from "axios";
import "../Genres/Genres.scss";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router

function Genres() {
  const [data, setData] = useState([]); // Data will hold the list of genres
  const [loading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch genres from TMDb API
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=0c43f3a99dd87115bcb9db112a118c03`
      )
      .then(function (response) {
        setData(response?.data?.genres || []); // Set genres list
        setIsLoading(false); // Set loading to false when data is fetched
      })
      .catch(function (error) {
        console.log("Error fetching data:", error);
        setError(error); // Set error if fetching fails
        setIsLoading(false); // Set loading to false even on error
      });
  }, []); // Only run on component mount

  if (loading) return <p>Loading...</p>; // Show loading indicator while fetching
  if (error) return <p>Error fetching genres: {error.message}</p>; // Show error message if fetching fails

  return (
    <div className="genres">
      <h1>Genres</h1>
      <ul>
        {data.map((genre) => (
          <li key={genre.id}>
            {/* Link to the movies by genre page */}
            <Link to={`/genre/${genre.id}`}>{genre.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Genres;
