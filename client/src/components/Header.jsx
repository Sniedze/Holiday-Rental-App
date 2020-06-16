import React from "react";
//import { NavLink, Link } from "react-router-dom";
import { logout } from "../functions/logout";
import { useHistory } from "react-router-dom";
import "../styling/css/Navbar.css";

const Header = props => {
  const history = useHistory();
  const { isAuth, setIsAuth } = props;

  const handleClick = () => {
    logout(setIsAuth);
    history.replace("/home");
  };

  return (
    <nav class="navbar navbar-expand-md bg-dark navbar-dark sticky-top">
      <a class="navbar-brand text-center w-100 " href="/">
        <img src="/Logo.png" alt="logo" style={{ width: 200 }}></img>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav text-center">
          {isAuth ? (
            <>
              <li class="nav-item">
                <a class="nav-link" href="/profie">
                  Profile
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" to="/" onClick={handleClick}>
                  Logout
                </a>
              </li>
            </>
          ) : (
            <>
              <li class="nav-item ">
                <a class="nav-link" href="/login">
                  Login
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/signup">
                  Register
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
