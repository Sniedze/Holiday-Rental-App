import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleClick = event => {
    event.preventDefault();
    //console.log(firstName, lastName, email);
    if (
      (firstName,
      lastName,
      email,
      password,
      repeatPassword && password === repeatPassword)
    ) {
      axios
        .post("/user", {
          firstName,
          lastName,
          email,
          password,
          repeatPassword
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      console.log("Error");
    }
  };

  return (
    <div className="container">
      <h1>Create the profile</h1>
      <p>.............</p>

      <form method="POST">
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          //required
          onChange={event => setFirstName(event.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          //required
          onChange={event => setLastName(event.target.value)}
        ></input>
        <input
          type="email"
          placeholder="Email"
          name="email"
          //required
          onChange={event => setEmail(event.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          name="password"
          //required
          onChange={event => setPassword(event.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Repeat Password"
          name="repeatPassword"
          //required
          onChange={event => setRepeatPassword(event.target.value)}
        ></input>
        <button type="submit" onClick={handleClick}>
          CREATE
        </button>
      </form>
    </div>
  );
};

export default Signup;
