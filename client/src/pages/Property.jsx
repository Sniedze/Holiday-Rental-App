import React from "react";

const Property = ({ props }) => {
  const data = props.location.state.data;

  return (
    <div className="col-sm-12 col-lg-4" key={"index-" + data.id}>
      <div className="card" style={{ width: "300px" }}>
        <img
          className="rounded shadow-lg"
          style={{ maxWidth: "100%" }}
          src={`http://localhost:9090/images/${data.images[0].name}`}
          alt=""
        ></img>
        <div className="card-body">
          <h3 className="card-title">{data.title}</h3>
          <div
            className="container"
            style={{
              backgroundColor: "rgb(50, 57, 65)",
              color: "white"
            }}
          >
            <h5>{data.price}</h5>
          </div>
          <p className="card-text" style={{ color: "black" }}>
            {data.description}
          </p>
          <button type="button" className="btn btn-warning">
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Property;
