import React from "react";
import Search from "../components/Search";
import "../styling/css/Home.css";
import { FaAngleDown } from "react-icons/fa";
import Footer from "../components/Footer";
import Signup from "./Signup";

const Home = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row w-100 p-3">
          <div className="col-sm-6 text-center">
            <h1>WELCOME TO HOLIDAY HOUSE</h1>
            <br></br>
            <p>Plan the best vacation of your life in holiday homes.</p>
            <br></br>
            <hr />
            <br></br>
            <br></br>
            <Search />
            <br></br>
            <div className="container-1">
              <FaAngleDown size={70} color="rgb(174, 134, 37)" />
            </div>
          </div>
          <div className="col-sm-6">
            <img
              src="./FrontPic.jpg"
              className="rounded float-right shadow-lg img-fluid"
              alt="FrontImage"
            ></img>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <img
              src="./searchPic.jpg"
              className="rounded float-right shadow-lg img-thumbnail"
              alt="FrontImage"
            ></img>
          </div>
          <div className="col-sm-6 text-center">
            <h2>Become an owner of the property</h2>
            <p>Rent and manage your properties by signing up</p>
            <br></br>
            <br></br>
            <div className="register" id="register">
              <Signup />
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid" style={{ backgroundColor: "white" }}>
        <div className="row">
          <div className="col text-center">
            <h3>Plan your holiday</h3>
          </div>
          <div className="col text-center">
            <h3>Rent your dream house</h3>
          </div>
          <div className="col text-center">
            <h3>Get finance help</h3>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
