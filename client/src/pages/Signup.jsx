import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [signedUp, setSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleClick = event => {
    event.preventDefault();
    //console.log(firstName, lastName, email);

    if (
      firstName &&
      lastName &&
      email &&
      password &&
      repeatPassword &&
      password === repeatPassword
    ) {
      axios
        .post("http://localhost:9090/users/register", {
          firstName,
          lastName,
          email,
          password
        })
        .then(function(response) {
          setSignUp(true); // changing hook state
          history.push("/");
        })
        .catch(function(error) {
          if (error.response.status === 400) {
            setError("User with this email already exists");
          } else setError("Server error");
        });
    } else {
      setError("Invalid Data");
    }
  };

  return (
    <div>
      {signedUp ? (
        <h1>User Created</h1>
      ) : (
        <div className="container">
          <form method="POST">
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  required
                  onChange={event => setFirstName(event.target.value)}
                ></input>
              </div>
              <div className="col-6">
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  //required
                  onChange={event => setLastName(event.target.value)}
                ></input>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  //required
                  onChange={event => setEmail(event.target.value)}
                ></input>
              </div>
              <div className="col-6">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  //required
                  onChange={event => setPassword(event.target.value)}
                ></input>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="password"
                  placeholder="Repeat Password"
                  name="repeatPassword"
                  //required
                  onChange={event => setRepeatPassword(event.target.value)}
                ></input>
              </div>
              <div className="col-6"></div>
            </div>
            <br></br>
            <button
              type="submit"
              className="btn btn-dark"
              onClick={handleClick}
            >
              CREATE
            </button>
          </form>
          <h2>{error}</h2>
        </div>
      )}
    </div>
  );
};

export default Signup;
