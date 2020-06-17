import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const getProperties = async () => {
      try {
        await axios
          .get(`http://localhost:9090/user/properties`)
          .then((properties) => {
            const allProperties = properties.data;
            setProperties(allProperties);
            console.log("properties: ", allProperties);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getProperties();
  }, []);

  return (
    <>
      <h1>Profile</h1>
      <NavLink to="/property/create">Add New Property</NavLink>
    </>
  );
};
export default Profile;
