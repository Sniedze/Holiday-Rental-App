import React from "react";
import { NavLink } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <h1>Profile</h1>
      <NavLink to="/property/create">Add New Property</NavLink>
    </>
  );
};
export default Profile;
