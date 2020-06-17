import React from "react";
import Search from "../components/Search";
import "../styling/css/Home.css";
import { FaAngleDown } from "react-icons/fa";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <div class="container-fluid">
        <div class="row w-100 p-3">
          <div class="col-sm-6 text-center">
            <h1>WELCOME TO HOLIDAY HOUSE</h1>
            <br></br>
            <p>Plan the best vacation of your life in holiday homes.</p>
            <br></br>
            <hr />
            <br></br>
            <div class="container-1">
              <FaAngleDown size={70} color="rgb(174, 134, 37)" />
            </div>
          </div>
          <div class="col-sm-6">
            <img
              src="./FrontPic.jpg"
              class="rounded float-right shadow-lg img-fluid"
              alt="FrontImage"
            ></img>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <img
              src="./searchPic.jpg"
              class="rounded float-right shadow-lg img-thumbnail"
              alt="FrontImage"
            ></img>
          </div>
          <div class="col-sm-6 text-center">
            <h2>Search for the holiday house</h2>
            <p>Enter destination city, country and number of guests</p>
            <br></br>
            <Search />;
          </div>
        </div>
      </div>
      <div class="container-fluid" style={{ backgroundColor: "white" }}>
        <div class="row">
          <div class="col text-center">
            <h3>Plan your holiday</h3>
          </div>
          <div class="col text-center">
            <h3>Rent your dream house</h3>
          </div>
          <div class="col text-center">
            <h3>Get finance help</h3>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
