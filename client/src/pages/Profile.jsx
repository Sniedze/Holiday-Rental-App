import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { FaUserCog } from "react-icons/fa";
import Popup from "reactjs-popup";
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
      <div className="float-right mr-5 mt-5">
        <Popup
          contentStyle={{
            width: "300px",
            height: "200px",
            fontFamily: "Heiti SC"
          }}
          trigger={
            <div>
              <FaUserCog
                style={{
                  width: 50,
                  height: 50
                }}
              />
            </div>
          }
          position="bottom right"
        >
          <div>
            <div>
              <p className="mt-3">{user.email}</p>
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
              >
                Delete your account
              </button>
            </div>
          </div>
        </Popup>
      </div>
      <h1>My Properties</h1>
      <NavLink to="/property/create">Add New Property</NavLink>
      <div className="container-fluid">
        {properties.map((property, index) => {
          return (
            <NavLink
              to={{
                pathname: `/property/${property.id}`,
                state: { data: property }
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
                        color: "white"
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
