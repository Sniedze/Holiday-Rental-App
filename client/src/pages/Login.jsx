import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = ({ setIsAuth }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // "" = empty string
  const [error, setError] = useState("");

  const handleClick = (event) => {
    event.preventDefault();
    if (email && password) {
      axios({
        method: "post",
        url: "http://localhost:9090/users/login",
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          email,
          password,
        },
      })
        .then(function (res) {
          if (res.status === 200) {
            console.log(res);
            setIsAuth(true);
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
