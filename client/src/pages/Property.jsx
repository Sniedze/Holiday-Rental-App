import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Property = props => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const setLocation = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    getProperties(id);
  }, [history]);

  const getProperties = async id => {
    if (!id) {
      history.replace("/profile");
    }
    try {
      await axios({
        method: "GET",
        url: `http://localhost:9090/user/property/${id}`,
        withCredentials: true
      }).then(data => {
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
      <h1 className="text-center mt-5">Manage Your Property</h1>
      <div className="container-fluid mt-5">
        <div className="row" key={"index-" + data.id}>
          <div className="col-md-6">
            {" "}
            <img
              className="rounded shadow-lg ml-5"
              style={{ width: "800px" }}
              src={`http://localhost:9090/images/${data.name}`}
              alt=""
            ></img>
          </div>
          <div className="col-md-6">
            <h2 className="text-center">{data.title} property</h2>
            <br />
            <p className="text-center" style={{ color: "white" }}>
              {data.description}
            </p>
            <hr />
            <h4 style={{ color: "rgb(174, 134, 37)" }}>{data.price} EUR</h4>
            <br></br>
            <h5 style={{ color: "white", margin: "0" }}>
              <strong style={{ color: "rgb(174, 134, 37)" }}>Bedrooms: </strong>
              {data.bedrooms}
            </h5>
            <br></br>
            <h5 style={{ color: "white", margin: "0" }}>
              <strong style={{ color: "rgb(174, 134, 37)" }}>Bathrooms:</strong>{" "}
              {data.bathrooms}
            </h5>{" "}
            <br></br>
            <h5 style={{ color: "white", margin: "0" }}>
              <strong style={{ color: "rgb(174, 134, 37)" }}>
                Maximum number of guests:{" "}
              </strong>
              {data.guest_capacity}
            </h5>{" "}
            <br></br>
            <h5 style={{ color: "white", margin: "0" }}>
              <strong style={{ color: "rgb(174, 134, 37)" }}>Address:</strong>{" "}
              {data.street}, {data.city}, {data.postal_code}, {data.country}
            </h5>
            <br></br>
            <hr />
            <h5 className="text-center mt-5">
              <a href="#" style={{ size: "50px", color: "white" }}>
                Edit <FaEdit />
              </a>
            </h5>
            <h5 className="text-center mt-5">
              <a href="#" style={{ size: "50px", color: "white" }}>
                Delete <MdDelete />
              </a>
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};
export default Property;
