import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const Property = (props) => {
  const history = useHistory();
  const [data, setData] = useState([]);

  console.log(props);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    console.log(id);
    getProperties(id);
  }, [history]);

  const getProperties = async (id) => {
    if (!id) {
      history.replace("/profile");
    }
    try {
      await axios({
        method: "GET",
        url: `http://localhost:9090/property/${id}`,
        withCredentials: true,
      }).then((data) => {
        console.log(data);
        const allProperties = data;
        setData(allProperties);
        console.log(allProperties);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <h1>Property</h1>
    // <div className="col-sm-12 col-lg-4" key={"index-" + data.id}>
    //   <div className="card" style={{ width: "300px" }}>
    //     <img
    //       className="rounded shadow-lg"
    //       style={{ maxWidth: "100%" }}
    //       src={`http://localhost:9090/images/${data.images[0].name}`}
    //       alt=""
    //     ></img>
    //     <div className="card-body">
    //       <h3 className="card-title">{data.title}</h3>
    //       <div
    //         className="container"
    //         style={{
    //           backgroundColor: "rgb(50, 57, 65)",
    //           color: "white",
    //         }}
    //       >
    //         <h5>Price: {data.price} EUR</h5>
    //       </div>
    //       <p className="card-text" style={{ color: "black" }}>
    //         {data.description}
    //       </p>
    //       <h5>Bedrooms: {data.bedrooms} EUR</h5>
    //       <h5>Bathrooms: {data.bathrooms} EUR</h5>
    //       <h5>Maximum number of guests: {data.guest_capacity} EUR</h5>
    //       <button type="button" className="btn btn-warning">
    //         View More
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Property;
