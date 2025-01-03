import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../ActorMovies/ActorMovies.scss";
import { Pagination } from "@mui/material";

function ActorMovies() {
  const { actorId } = useParams();
  const [movies, setMovies] = useState([]);
  const [actorName, setActorName] = useState("");

  useEffect(() => {
    const fetchActorData = async () => {
      try {
        // Fetch movies played by the actor
        const moviesResponse = await axios.get(
          `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=0c43f3a99dd87115bcb9db112a118c03`
        );
        setMovies(moviesResponse.data.cast);

        // Fetch actor details including their name
        const actorResponse = await axios.get(
          `https://api.themoviedb.org/3/person/${actorId}?api_key=0c43f3a99dd87115bcb9db112a118c03`
        );
        setActorName(actorResponse.data.name);
      } catch (error) {
        console.log("Error fetching actor data:", error);
      }
    };

    fetchActorData();
  }, [actorId]);

  return (
    <div className="actor-movies">
      <h1>Movies played by {actorName}</h1>
      <div className="movies-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <Link to={`/movie/${movie.id}`} >
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActorMovies;
