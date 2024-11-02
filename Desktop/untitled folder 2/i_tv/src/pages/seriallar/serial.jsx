import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./main.scss";

const API_KEY = "41ee00ef54c639e104c9b60ce5d3736b";
const BASE_URL = "https://api.themoviedb.org/3";

const Seriallar = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/tv/popular?api_key=${API_KEY}&page=4`);
        setSeries(response.data.results || []);
      } catch (err) {
        setError("Error fetching TV series.");
        console.error("Error fetching TV series:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, []);

  return (
    <div className="container">
      {loading && <h1 className="loading">Loading...</h1>}
      {error && <h1 className="error">{error}</h1>}
      {!loading && !error && (
        <div className="cards1">
          {series.map((item) => (
            <div className="card1" key={item.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.name}
                className="card-image1"
              />
              <h3 className="card-title1">{item.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Seriallar;
