import React, { useState } from "react";
const axios = require("axios");

const AddProperty = () => {
  const multipleImages = [];
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [guestCapacity, setGuestCapacity] = useState("");
  const [message, setMessage] = useState("");

  const handleImagesUpload = async files => {
    for (let i = 0; i < files.length; i++) {
      multipleImages.push(files[i]);
    }
    setImages(multipleImages);
  };
  const handleClick = ev => {
    ev.preventDefault();
    if (
      true
      /*             title &&
      street &&
      type &&
      postalCode &&
      city &&
      country &&
      description &&
      bedrooms &&
      bathrooms &&
      guestCapacity &&
      size &&
      price &&
      mainImage &&
      images */
    ) {
      const formData = new FormData();
      formData.append("mainImage", mainImage);
      formData.append("title", title);
      formData.append("street", street);
      formData.append("type", type);
      formData.append("postalCode", postalCode);
      formData.append("city", city);
      formData.append("country", country);
      formData.append("description", description);
      formData.append("bedrooms", bedrooms);
      formData.append("bathrooms", bathrooms);
      formData.append("guestCapacity", guestCapacity);
      formData.append("size", size);
      formData.append("price", price);
      images.forEach(img => formData.append("images", img));
      axios({
        method: "POST",
        url: "http://localhost:9090/properties/create",
        withCredentials: true,
        data: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        console.log(res);
        if (res.status === 200) {
          setMessage(`New property ${title} created.`);
        } else setMessage("Failed to add property.");
      });
    } else setMessage("Data missing.");
  };

  return (
    <>
      <h1 className="text-center mt-5">Add Property</h1>
      <h2 classname="text-center mt-5">{message}</h2>
      <div
        className="container-fluid mt-5 "
        style={{
          backgroundColor: "white",
          width: "700px",
          borderRadius: "10px",
          opacity: "80%"
        }}
      >
        <form encType="multipart/form-data">
          <div className="row mt-5">
            <div className="col mt-5">
              <label htmlFor="propertyTitleInput">Title</label>
              <input
                className="form-control"
                type="text"
                id="propertyTitleInput"
                onChange={event => setTitle(event.target.value)}
              ></input>
            </div>
            <div className="col mt-5">
              <label htmlFor="propertyStreet">Street</label>
              <input
                className="form-control"
                type="text"
                id="propertyStreet"
                onChange={event => setStreet(event.target.value)}
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="propertyTypeInput">Type</label>
              <select
                className="form-control"
                type="text"
                id="propertyTypeInput"
                onChange={event => setType(event.target.value)}
              >
                <option value="default">Default</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="room">Room</option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="propertyPostalCode">Postal Code</label>
              <input
                className="form-control"
                type="text"
                id="propertyPostalCode"
                onChange={event => setPostalCode(event.target.value)}
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {" "}
              <label htmlFor="propertyCity">City</label>
              <input
                className="form-control"
                type="text"
                id="propertyCity"
                onChange={event => setCity(event.target.value)}
              ></input>
            </div>
            <div className="col">
              <label htmlFor="propertyCountry">Country</label>
              <input
                className="form-control"
                type="text"
                id="propertyCountry"
                onChange={event => setCountry(event.target.value)}
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="propertyBedrooms">Bedrooms</label>
              <input
                className="form-control"
                type="number"
                id="propertyBedrooms"
                onChange={event => setBedrooms(event.target.value)}
              ></input>
            </div>
            <div className="col">
              <label htmlFor="propertyGuests">Guests #</label>
              <input
                className="form-control"
                type="number"
                id="propertyGuests"
                onChange={event => setGuestCapacity(event.target.value)}
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {" "}
              <label htmlFor="propertyBathrooms">Bathrooms</label>
              <input
                className="form-control"
                type="number"
                id="propertyBathrooms"
                onChange={event => setBathrooms(event.target.value)}
              ></input>
            </div>
            <div className="col">
              <label htmlFor="propertySqm">Size</label>
              <input
                className="form-control"
                type="number"
                id="propertySqm"
                onChange={event => setSize(event.target.value)}
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="propertyPriceInput">Price</label>
              <input
                className="form-control"
                type="number"
                id="propertyPriceInput"
                onChange={event => setPrice(event.target.value)}
              ></input>
            </div>
            <div className="col">
              {" "}
              <label htmlFor="propertyDescription">Description</label>
              <textarea
                className="form-control"
                maxLength="250"
                id="propertyDescription"
                onChange={event => setDescription(event.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="row">
            <div className="col">
              {" "}
              <label htmlFor="mainImageInput">Main Image</label>
              <input
                className="form-control"
                id="mainImageInput"
                type="file"
                alt="my property"
                accept="image/png, image/jpg, image/jpeg"
                onChange={event => {
                  setMainImage(event.target.files[0]);
                }}
              ></input>
            </div>
            <div className="col">
              {" "}
              <label htmlFor="imagesInput">Images</label>
              <input
                className="form-control"
                id="imagesInput"
                type="file"
                alt="my properties"
                accept="image/png, image/jpg, image/jpeg"
                multiple
                onChange={event => {
                  handleImagesUpload(event.target.files);
                }}
              ></input>
            </div>
          </div>

          <br></br>
          <button
            className="btn btn-dark mb-5 text-center"
            onClick={handleClick}
          >
            ADD
          </button>
        </form>
      </div>
    </>
  );
};
export default AddProperty;
