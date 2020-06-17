import React from "react";
import Popup from "reactjs-popup";
import { logout } from "../functions/logout";
import { useHistory } from "react-router-dom";
import "../styling/css/Navbar.css";
import Login from "../pages/Login";

const Header = props => {
  const history = useHistory();
  const { isAuth, setIsAuth } = props;

  const handleClick = () => {
    logout(setIsAuth);
    history.replace("/");
  };

  return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark sticky-top">
      <a className="navbar-brand text-center w-100 " href="/">
        <img src="/Logo.png" alt="logo" style={{ width: 200 }}></img>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav text-center">
          {isAuth ? (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/profile">
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" to="/" onClick={handleClick}>
                  Logout
                </a>
              </li>
            </>
          ) : (
            <>
              <Popup
                contentStyle={{
                  width: "500px",
                  height: "300px",
                  fontFamily: "Heiti SC",
                  marginTop: "200px"
                }}
                trigger={
                  <li className="nav-item">
                    <a className="nav-link">Login</a>
                  </li>
                }
                position="bottom-right"
              >
                <div>
                  <Login />
                </div>
              </Popup>

              <li className="nav-item">
                <a className="nav-link scroll-link" href="#register">
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
