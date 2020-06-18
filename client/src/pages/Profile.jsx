import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { FaUserCog } from "react-icons/fa";
import Popup from "reactjs-popup";
import { MdAddBox } from "react-icons/md";
import axios from "axios";

const Profile = () => {
  const history = useHistory();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const getProperties = async () => {
      try {
        await axios({
          method: "GET",
          url: "http://localhost:9090/user/properties",
          withCredentials: true
        }).then(properties => {
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

  const [user, setUser] = useState("");
  useEffect(() => {
    const getUser = async () => {
      try {
        let response = await axios.get("http://localhost:9090/user", {
          withCredentials: true
        });

        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.log(error.data);
      }
    };
    getUser();
  }, []);

  const { informations } = user;
  console.log(informations);

  async function deleteUser() {
    try {
      const request = await axios.delete(
        `http://localhost:9090/users/delete/`,
        { withCredentials: true }
      );

      history.replace("/login");
      console.log("The user has been deleted");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1 className="text-center mt-5">
        {user.first_name} {user.last_name}'s properties
      </h1>
      <div className="float-right mr-5">
        <Popup
          contentStyle={{
            width: "300px",
            height: "200px",
            fontFamily: "Heiti SC"
          }}
          trigger={
            <div className="mt-5">
              <FaUserCog
                style={{
                  width: 50,
                  height: 50,
                  color: "rgb(174, 134, 37)"
                }}
              />
            </div>
          }
          position="bottom right"
        >
          <div>
            <div>
              <h4 className="mt-3 ml-3" style={{ color: "black" }}>
                {user.email}
              </h4>
              {informations &&
                informations.map(information => <p>{information.data}</p>)}
            </div>
            <div className="mt-3 ml-3">
              <a href="/home" style={{ color: "rgb(199, 122, 6" }}>
                Update your account
              </a>
            </div>
            <br></br>
            <div className="mb-3 ml-3">
              <button
                className="btn btn-dark"
                type="button"
                onClick={deleteUser}
                style={{ width: "150px" }}
              >
                Delete your account
              </button>
            </div>
          </div>
        </Popup>
      </div>
      <div className="container-fluid">
        <div className="row">
          <h5 className="ml-3">
            <a href="property/create" style={{ size: "50px", color: "white" }}>
              <MdAddBox />
              Add New Property
            </a>
          </h5>
          <div className="col-sm-12">
            <div id="inam" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div class="container-fluid" style={{ paddingLeft: "200px" }}>
                    <div className="row">
                      {properties.map((property, index) => {
                        return (
                          <>
                            <NavLink
                              to={{
                                pathname: "/property",
                                search: `?id=${property.id}`
                              }}
                            >
                              <div
                                className="col-sm-12 col-lg-4 mt-5"
                                key={"index-" + index}
                              >
                                <div
                                  className="card"
                                  style={{ width: "300px" }}
                                >
                                  <img
                                    className="rounded shadow-lg"
                                    style={{ maxWidth: "100%" }}
                                    src={`http://localhost:9090/images/${property.images[0].name}`}
                                    alt=""
                                  ></img>
                                  <div className="card-body">
                                    <h3
                                      className="card-title"
                                      style={{
                                        fontFamily: "lavigne-text, sans-serif",
                                        fontSize: "25px"
                                      }}
                                    >
                                      {property.title}
                                    </h3>
                                    <div
                                      className="container"
                                      style={{
                                        backgroundColor: "rgb(50, 57, 65)",
                                        color: "white"
                                      }}
                                    >
                                      <h5>{property.price} €</h5>
                                    </div>
                                    <p
                                      className="card-text"
                                      style={{ color: "black" }}
                                    >
                                      {property.description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </NavLink>
                          </>
                        );
                      })}
                      );
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ); })} );
    </>
  );
};
export default Profile;
