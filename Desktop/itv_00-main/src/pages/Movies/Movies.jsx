import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../Movies/Movies.scss";

const Movies = () => {
  const [genres, setGenres] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);
  const apiKey = "0c43f3a99dd87115bcb9db112a118c03";
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch genres
    const fetchGenres = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
      );
      setGenres(response.data.genres);
    };

    fetchGenres();
  }, [apiKey]);

  const getRandomMovie = async () => {
    // Select a random genre
    const randomGenre = genres[Math.floor(Math.random() * genres.length)];

    if (randomGenre) {
      // Fetch movies for the selected random genre
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${randomGenre.id}`
      );

      // Select a random movie from the fetched movies
      const movies = response.data.results;
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];

      setRandomMovie(randomMovie);
    }
  };

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`); // Navigate to the MovieInner component
  };

  return (
    <>
      <div className="movies container">
        <h1>Random Movie by Genre</h1>
        <button onClick={getRandomMovie}>Get Random Movie</button>

        {randomMovie && (
          <div onClick={() => handleMovieClick(randomMovie.id)} style={{ cursor: 'pointer' }}>
            <h2>{randomMovie.title}</h2>
            <p>{randomMovie.overview}</p>
            <img
              src={`https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`}
              alt={randomMovie.title}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Movies;
