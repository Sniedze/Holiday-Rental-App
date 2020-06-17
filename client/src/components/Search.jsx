import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styling/css/Search.css";

const Search = () => {
  const history = useHistory();
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSubmit = event => {
    event.preventDefault();
    history.push({
      state: { city, country, guests },
      pathname: "/results",
      search: `?city=${city}&country=${country}&guest_capacity=${guests}`
    });
    //console.log(city, country, guests);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          placeholder="City....."
          type="text"
          value={city}
          onChange={event => setCity(event.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          placeholder="Country....."
          type="text"
          value={country}
          onChange={event => setCountry(event.target.value)}
        ></input>
      </div>
      <div className="form-group">
        <input
          type="number"
          min="1"
          value={guests}
          onChange={event => setGuests(event.target.value)}
        ></input>
      </div>

      <button className="btn btn-dark">Search</button>
    </form>
  );
};

export default Search;
