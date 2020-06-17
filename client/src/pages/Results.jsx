import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Results = (props) => {
  const history = useHistory();

  const [results, setResults] = useState([]);
  //const [city, setCity] = useState("");
  //const [country, setCountry] = useState("");
  //const [guests, setGuests] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const city = params.get("city");
    const country = params.get("country");
    const guests = params.get("guest_capacity");
    console.log(!city);
    if (!city || !country || !guests) {
      history.replace("/");
    }

    getResults(city, country, guests);
  }, [history]);

  const getResults = async (city, country, guests) => {
    try {
      let response = await axios.get(
        `http://localhost:9090/properties/search?city=${city}&country=${country}&guest_capacity=${guests}`
      );
      setResults(response.data.results);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {results.map((result, index) => {
        return (
          <>
            <div className="container-fluid">
              <div className="row" key={"index-" + index}>
                <div className="col-md-6 col-sm-12">
                  <img
                    className="rounded shadow-lg"
                    src={`http://localhost:9090/images/${result.image_name}`}
                    alt=""
                  ></img>
                </div>
                <div className="col-md-6 col-sm-12">
                  <h2>{result.city}</h2>
                  <hr></hr>

                  <p>
                    <small>{result.country}</small>
                  </p>

                  <p>
                    <small>{result.guest_capacity}</small>
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Results;
