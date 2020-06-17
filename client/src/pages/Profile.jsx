import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Property from "./Property";

const Profile = () => {
  const [properties, setProperties] = useState([]);

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
  useEffect(() => {
    getProperties();
  }, []);

  return (
    <>
      <h1>My Properties</h1>
      <NavLink to="/property/create">Add New Property</NavLink>
      <div className="container-fluid">
        {properties.map((property, index) => {
          return (
            <NavLink
              to={{
                pathname: `/property/${property.id}`,
                state: { data: property },
              }}
            >
              <div className="col-sm-12 col-lg-4" key={"index-" + index}>
                <div className="card" style={{ width: "300px" }}>
                  <img
                    className="rounded shadow-lg"
                    style={{ maxWidth: "100%" }}
                    src={`http://localhost:9090/images/${property.images[0].name}`}
                    alt=""
                  ></img>
                  <div className="card-body">
                    <h3 className="card-title">{property.title}</h3>
                    <div
                      className="container"
                      style={{
                        backgroundColor: "rgb(50, 57, 65)",
                        color: "white",
                      }}
                    >
                      <h5>{property.price}</h5>
                    </div>
                    <p className="card-text" style={{ color: "black" }}>
                      {property.description}
                    </p>
                    <button type="button" className="btn btn-warning">
                      View More
                    </button>
                  </div>
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </>
  );
};
export default Profile;
