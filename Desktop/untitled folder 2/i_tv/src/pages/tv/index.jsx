import axios from "axios";
import { useEffect, useState } from "react";
import Tv from "../tv/main.scss";
import useFetchData from "../../hooks/fetch";
import Pagination1 from "../../components/pagination/pagination";

const API_KEY = "41ee00ef54c639e104c9b60ce5d3736b";
const BASE_URL = "https://api.themoviedb.org/3/tv/popular";
const DESIRED_COUNT = 18;

const TV = () => {
  const [page, setPage] = useState(1);
  const { data: shows, loading, error } = useFetchData("tv/popular", {
    desiredCount: 20,
    page
  });

  return (
    <div className="container">
      <div className="cards">
        {shows?.map((product) => (
          <div className="card" key={product.id}>
            <img
              src={"https://image.tmdb.org/t/p/w500" + product?.poster_path}
              alt={product.name}
              className="card-image"
            />
            <h3 className="card-title">{product.name}</h3>
          </div>
        ))}
      </div>
      <Pagination1 count={600} onPageChange={setPage} />
    </div>
  );
};

export default TV;
