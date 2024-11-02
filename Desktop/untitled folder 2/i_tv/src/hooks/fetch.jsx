import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "41ee00ef54c639e104c9b60ce5d3736b";
const BASE_URL = "https://api.themoviedb.org/3";

const useFetchData = (endpoint, options = {}) => {
  const { id, desiredCount = 20, page = 1 } = options;
  const [data, setData] = useState(id ? null : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let resultData;
        if (id) {
          const response = await axios.get(`${BASE_URL}/${endpoint}/${id}?api_key=${API_KEY}`);
          resultData = response.data;
        } else {
          const totalPages = Math.ceil(desiredCount / 20);
          let allData = [];

          for (let currentPage = page; currentPage < page + totalPages; currentPage++) {
            const response = await axios.get(
              `${BASE_URL}/${endpoint}?api_key=${API_KEY}&page=${currentPage}`
            );
            allData = [...allData, ...response.data.results];

            if (allData.length >= desiredCount) break;
          }

          resultData = allData.slice(0, desiredCount);
        }

        setData(resultData);
      } catch (err) {
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, id, desiredCount, page]);

  return { data, loading, error };
};

export default useFetchData;
