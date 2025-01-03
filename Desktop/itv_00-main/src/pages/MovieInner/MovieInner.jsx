import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../MovieInner/MovieInner.scss";
import { Rating } from "@mui/material";

function MovieInner() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [trailer, setTrailer] = useState(null);
  const [director, setDirector] = useState(null);
  const [cast, setCast] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [images, setImages] = useState([]); 
  const [showAllCast, setShowAllCast] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // State for the clicked image
  const genreNames = data?.genres?.map((genre) => genre.name) || [];
    const [expandedImage, setExpandedImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=0c43f3a99dd87115bcb9db112a118c03`
        );
        setData(movieResponse.data);

        const creditsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=0c43f3a99dd87115bcb9db112a118c03`
        );
        const directorData = creditsResponse.data.crew.find(
          (member) => member.job === "Director"
        );
        setDirector(directorData ? directorData.name : "N/A");
        setCast(creditsResponse.data.cast);

        const trailerResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=0c43f3a99dd87115bcb9db112a118c03`
        );
        const videos = trailerResponse.data.results;
        const youtubeTrailer = videos.find(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );
        setTrailer(youtubeTrailer ? youtubeTrailer.key : null);

        const relatedMoviesResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=0c43f3a99dd87115bcb9db112a118c03`
        );
        setRelatedMovies(relatedMoviesResponse.data.results);

        const imagesResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/images?api_key=0c43f3a99dd87115bcb9db112a118c03`
        );
        setImages(imagesResponse.data.backdrops || []);
      } catch (error) {
        console.log("Error fetching data:", error);
      }

      const handleImageClick = (filePath) => {
        setExpandedImage(expandedImage === filePath ? null : filePath);
      };
    
    };

    fetchData();
  }, [id]);

  const handleActorClick = (actorId) => {
    navigate(`/actor/${actorId}/movies`);
    window.scrollTo(0, 0);
  };

  

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
    window.scrollTo(0, 0);
  };

  const toggleShowMore = () => {
    setShowAllCast(!showAllCast);
  };

  const handleImageClick = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const releaseYear = data?.release_date
    ? new Date(data.release_date).getFullYear()
    : "N/A";
  const runtime = data?.runtime ? `${data.runtime} minutes` : "N/A";

  return (
    <>
      <div
        className="movieinner"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${data?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <div className="left">
          <img
            src={"https://image.tmdb.org/t/p/w500" + data?.poster_path}
            alt={data?.title}
          />
        </div>

        <div className="middle">
          <div className="info">
            <h1>{data?.title}</h1>
            <Rating
              name="movie-rating"
              value={data?.vote_average / 2}
              precision={0.5}
              readOnly
            />
            <p>
              {data?.vote_average} from {data?.vote_count}
              <p>
                <b>Year of Production:</b> {releaseYear}
              </p>
              <p>
                <b>Duration:</b> {runtime}
              </p>
            </p>
            <p>
              <b>Watch {data?.title} on Hulu.</b> {data?.overview}
            </p>
            <p>
              <b>Genre: </b>
              {genreNames.join(", ")}
            </p>
            <p>
              <b>Country:</b>{" "}
              {data?.production_countries
                ?.map((country) => country.name)
                .join(", ") || " N/A"}
            </p>
            <p>
              <b>Director:</b> {director || "N/A"}
            </p>
            <p>
              <b>Cast:</b>
            </p>
            <div className="cast-cards">
              {cast.length > 0 ? (
                cast.slice(0, showAllCast ? cast.length : 4).map((member) => (
                  <div
                    key={member.id}
                    className="cast-card"
                    onClick={() => handleActorClick(member.id)}
                  >
                    <img
                      src={
                        member.profile_path
                          ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                          : "https://via.placeholder.com/150"
                      }
                      alt={member.name}
                    />
                    <p>{member.name}</p>
                  </div>
                ))
              ) : (
                <p>N/A</p>
              )}
              {!showAllCast && cast.length > 4 && (
                <button onClick={toggleShowMore}>View More</button>
              )}
              {showAllCast && (
                <button onClick={toggleShowMore}>View Less</button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="movie">
        {trailer && (
          <div className="movie_component">
            <h2>Watch the Trailer</h2>
            <iframe
              width="1080"
              height="555"
              src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
              title="YouTube trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>

      {/* Movie Images Section */}
      <div className="movie-images">
        <h2>Movie Images</h2>
        <div className="image-gallery">
          {images.length > 0 ? (
            images
              .slice(0, 6)
              .map((image, index) => (
                <img
                  key={index}
                  src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                  alt={`Movie Image ${index + 1}`}
                  className={expandedImage === image.file_path ? "clicked" : ""}
                  onClick={() => handleImageClick(image.file_path)} // Handle image click
                />
              ))
          ) : (
            <p>No images available.</p>
          )}
        </div>
        {expandedImage && (
          <div className="image-overlay" onClick={() => setExpandedImage(null)}>
            <img
              src={`https://image.tmdb.org/t/p/original${expandedImage}`}
              alt="Expanded"
              className="expanded"
            />
          </div>
        )}
      </div>

      {/* Related Movies Section */}
      <div className="related-movies">
        <h2>Related Movies</h2>
        <div className="related-movie-cards">
          {relatedMovies.length > 0 ? (
            relatedMovies.slice(0, 6).map((movie) => (
              <div
                key={movie.id}
                className="related-movie-card"
                onClick={() => handleMovieClick(movie.id)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <p>{movie.title}</p>
              </div>
            ))
          ) : (
            <p>No related movies found.</p>
          )}
        </div>
      </div>

      {/* Modal for the selected image */}
      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <img
            src={`https://image.tmdb.org/t/p/w500${selectedImage}`}
            alt="Selected"
          />
        </div>
      )}
    </>
  );
}

export default MovieInner;
