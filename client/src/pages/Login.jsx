import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { isAuthenticated } from "../functions/auth";

const Login = () => {
  useEffect(() => {
    if (isAuthenticated()) history.replace("/profile");
  });

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // "" = empty string
  const [error, setError] = useState("");

  const handleClick = (event) => {
    event.preventDefault();
    if ((email, password)) {
      axios
        .post("http://localhost:9090/users/login", {
          email,
          password,
        })
        .then(function (res) {
          console.log(res);
          if (res.status === 200) {
            return res.json().then(({ token }) => {
              localStorage.setItem("token", `bearer ${token}`);
              console.log("this is ulrikas token: " + token);
              return token;
            });
          }
        })
        .then(() => {
          history.replace("/profile");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setError("Invalid Data");
    }
  };

  return (
    <div className="container">
      <form method="POST">
        <input
          type="email"
          required
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <input
          type="password"
          required
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button onClick={handleClick}>LOGIN</button>
      </form>
      <h2>{error}</h2>
    </div>
  );
};
export default Login;
