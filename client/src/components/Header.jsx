import React from "react";
import { NavLink, Link } from "react-router-dom";
import { logout } from "../functions/logout";
import { useHistory } from "react-router-dom";

const Header = props => {
  const history = useHistory();
  const { isAuth, setIsAuth } = props;

  const handleClick = () => {
    logout(setIsAuth);
    history.replace("/home");
  };

  return (
    <nav>
      <NavLink to="/" exact>
        Home
      </NavLink>
      {isAuth ? (
        <>
          <NavLink to="/profile">Profile</NavLink>
          <Link to="" onClick={handleClick}>
            Logout
          </Link>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </>
      )}
    </nav>
  );
};

export default Header;
