import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { FaUserCog } from "react-icons/fa";
import Popup from "reactjs-popup";
import axios from "axios";
import Results from "./Results";

const Profile = () => {
  const history = useHistory();
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
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
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
    getProperties();
  }, []);

  const [user, setUser] = useState("");
  useEffect(() => {
    const getUser = async () => {
      try {
        let response = await axios.get("http://localhost:9090/user", {
          withCredentials: true,
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
            fontFamily: "Heiti SC",
          }}
          trigger={
            <div>
              <FaUserCog
                style={{
                  width: 50,
                  height: 50,
                  color: "rgb(174, 134, 37)",
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
                informations.map((information) => <p>{information.data}</p>)}
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
      <h1>My Properties</h1>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <div
              className="container-3"
              style={{ width: "500px", color: "white" }}
            ></div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="col-md-4">
          <NavLink to="/property/create">Add New Property</NavLink>
        </div>
        {properties.map((property, index) => {
          return (
            <>
              <NavLink
                to={{
<<<<<<< HEAD
                  pathname: "/property",
                  search: `?id=${property.id}`,
=======
                  pathname: `/property/${property.id}`,
                  state: { data: property },
>>>>>>> 2dc60076d719388015e416eada113393b88247f4
                }}
              >
                <div className="container-fluid">
                  <div className="row" key={"index-" + index}>
                    <div className="col-md-4">
                      <img
                        className="rounded shadow-lg"
                        src={`http://localhost:9090/images/${property.images[0].name}`}
                        alt=""
                        style={{ width: "500px" }}
                      ></img>
                    </div>
                    <div className="col-md-4">
                      <h1>{property.title}</h1>
                      <p>{property.price} €</p>
                      <p>{property.description}</p>
                    </div>
                  </div>
                </div>
              </NavLink>
            </>
          );
        })}
        );
      </div>
    </>
  );
};
export default Profile;
