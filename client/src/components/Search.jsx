import React, { useState } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import DateFnsUtils from "@date-io/date-fns";
import LuxonUtils from "@date-io/luxon";
import { DatePicker } from "@material-ui/pickers";
import "../styling/css/Search.css";

const Search = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [guests, setGuests] = useState(1);

  const handleSubmit = event => {
    event.preventDefault();
    console.log(city, country, arrivalDate, checkOutDate, guests);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="form-group">
        <input
          placeholder="City....."
          type="text"
          value={city}
          onChange={event => setCity(event.target.value)}
        />
      </div>
      <div class="form-group">
        <input
          placeholder="Country....."
          type="text"
          value={country}
          onChange={event => setCountry(event.target.value)}
        ></input>
      </div>
      <div class="form-group">
        <input
          type="number"
          min="1"
          value={guests}
          onChange={event => setGuests(event.target.value)}
        ></input>
      </div>
      <div class="form-group">
        <MuiPickersUtilsProvider
          utils={(DateFnsUtils, MomentUtils, LuxonUtils)}
        >
          <DatePicker value={arrivalDate} onChange={setArrivalDate} />
          <br></br>
          <DatePicker value={checkOutDate} onChange={setCheckOutDate} />
        </MuiPickersUtilsProvider>
      </div>

      <button>Search</button>
    </form>
  );
};

export default Search;
