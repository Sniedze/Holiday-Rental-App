import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const getProperties = async () => {
      try {
        await axios({
          method: "GET",
          url: "http://localhost:9090/user/properties",
          withCredentials: true,
        }).then((properties) => {
          const allProperties = properties.data.usersProperties;
          setProperties(allProperties);
          console.log(allProperties);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getProperties();
  }, []);

  return (
    <>
      <h1>My Properties</h1>
      <NavLink to="/property/create">Add New Property</NavLink>
    </>
  );
};
export default Profile;
