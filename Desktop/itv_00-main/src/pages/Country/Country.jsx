import axios from "axios";
import "../Country/Country.scss";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router

function Country() {
  const [data, setData] = useState([]); // Data will hold the list of selected countries
  const [loading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch countries from REST Countries API
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(function (response) {
        // Define country codes for the specific countries you want
        const selectedCountryCodes = ["AUS", "USA", "GBR", "CAN", "NZL", "IRL"];

        // Filter countries based on the country codes
        const selectedCountries = response.data.filter((country) =>
          selectedCountryCodes.includes(country.cca3)
        );

        setData(selectedCountries); // Set the filtered countries list
        setIsLoading(false); // Set loading to false when data is fetched
      })
      .catch(function (error) {
        console.log("Error fetching data:", error);
        setError(error); // Set error if fetching fails
        setIsLoading(false); // Set loading to false even on error
      });
  }, []); // Only run on component mount

  if (loading) return <p>Loading...</p>; // Show loading indicator while fetching
  if (error) return <p>Error fetching countries: {error.message}</p>; // Show error message if fetching fails

  return (
    <div className="country">
      <h1>Countries</h1>
      <ul>
        {data.map((country) => (
          <li key={country.cca3}>
            {/* Link to the country details page */}
            <Link to={`/country/${country.cca3}`}>{country.name.common}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Country;
