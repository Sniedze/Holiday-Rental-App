import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const Property = (props) => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [location, setLocation] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    getProperties(id);
  }, [history]);

  const getProperties = async (id) => {
    if (!id) {
      history.replace("/profile");
    }
    try {
      await axios({
        method: "GET",
        url: `http://localhost:9090/user/property/${id}`,
        withCredentials: true,
      }).then((data) => {
        const allProperties = data.data.property[0];
        setData(allProperties);
        console.log(allProperties);
        setLocation(data.locations);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>{data.title} property</h1>
      <div
        className="col-sm-12 col-lg-4"
        key={"index-" + data.id}
        style={{ width: "500px", margin: "0 auto" }}
      >
        <div className="card">
          <img
            className="rounded shadow-lg"
            style={{ maxWidth: "100%" }}
            src={`http://localhost:9090/images/${data.name}`}
            alt=""
          ></img>
          <div className="card-body">
            <div
              className="container"
              style={{
                backgroundColor: "rgb(50, 57, 65)",
                color: "white",
              }}
            >
              <h5>Price: {data.price} EUR</h5>
            </div>
            <p className="card-text" style={{ color: "black" }}>
              {data.description}
            </p>
            <p style={{ color: "black", margin: "0" }}>
              Bedrooms: {data.bedrooms}
            </p>
            <p style={{ color: "black", margin: "0" }}>
              Bathrooms: {data.bathrooms}
            </p>
            <p style={{ color: "black", margin: "0" }}>
              Maximum number of guests: {data.guest_capacity}
            </p>
            <p style={{ color: "black", margin: "0" }}>
              Address: {data.street}, {data.city}, {data.postal_code},{" "}
              {data.country}
            </p>
            <button type="button" className="btn btn-warning">
              Edit{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Property;
