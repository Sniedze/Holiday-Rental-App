import React from "react";
import Search from "../components/Search";
import "../styling/css/Home.css";
import { IoMdPaper } from "react-icons/io";
import { FaCommentsDollar } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import Footer from "../components/Footer";
import { FaAngleDown } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
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
              <a href="#offers">
                <FaAngleDown size={70} color="rgb(174, 134, 37)" />
              </a>
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
      <div class="contact-container section-container">
        <div class="container">
          <div class="row">
            <div class="col contact section-description text-center">
              <h2>NEED MORE INFO ? </h2>
              <p>Contact us and we will help you!</p>
              <div class="section-bottom-button mt-5">
                <a class="btn btn-dark btn-link-5 " href="#" target="_blank">
                  Contact
                </a>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse ac consequat metus. Nulla ut mauris sed nulla
                hendrerit scelerisque. Nam metus sapien, pulvinar quis elit
                vitae, posuere fringilla tortor.
              </p>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>

      <div className="container-fluid" id="register">
        <div className="row">
          <div className="col-sm-6">
            <img
              src="./searchPic.jpg"
              className="rounded float-right img-thumbnail"
              alt="FrontImage"
            ></img>
          </div>
          <div className="col-sm-6 text-center">
            <h2>Become an owner of the property</h2>
            <p>Rent and manage your properties by signing up</p>
            <br></br>
            <hr></hr>
            <br></br>
            <br></br>
            <div className="register">
              <Signup />
            </div>
          </div>
        </div>
      </div>

      <div className="offers-container section-container" id="offers">
        <div className="container">
          <div className="row">
            <div className="col-md-4 offers-box">
              <div className="row">
                <div className="col-md-4">
                  <div className="offers-box-icon">
                    <IoMdPaper />
                  </div>
                </div>
                <div className="col-md-8">
                  <h3>Plan Holiday</h3>
                  <hr />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse ac consequat metus. Nulla ut mauris sed nulla
                    hendrerit scelerisque. Nam metus sapien, pulvinar quis elit
                    vitae, posuere fringilla tortor.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 offers-box">
              <div className="row">
                <div className="col-md-4">
                  <div className="offers-box-icon">
                    <FaKey />
                  </div>
                </div>
                <div className="col-md-8">
                  <h3>Rent Dream House</h3>
                  <hr />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse ac consequat metus. Nulla ut mauris sed nulla
                    hendrerit scelerisque. Nam metus sapien, pulvinar quis elit
                    vitae, posuere fringilla tortor.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 offers-box ">
              <div className="row">
                <div className="col-md-4">
                  <div className="offers-box-icon">
                    <FaCommentsDollar />
                  </div>
                </div>
                <div className="col-md-8">
                  <h3>Get Support</h3>
                  <hr />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse ac consequat metus. Nulla ut mauris sed nulla
                    hendrerit scelerisque. Nam metus sapien, pulvinar quis elit
                    vitae, posuere fringilla tortor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Home;
