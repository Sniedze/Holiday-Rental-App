import React, { useState } from "react";
const axios = require("axios");

const AddProperty = () => {
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
  const [mainImage, setMainImage] = useState("");
  const [guestCapacity, setGuestCapacity] = useState("");
  const [message, setMessage] = useState("");

  const handleClick = ev => {
    ev.preventDefault();
    if (
      title &&
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
      images
    ) {
      const data = {
        title,
        street,
        type,
        postalCode,
        city,
        country,
        description,
        bedrooms,
        bathrooms,
        guestCapacity,
        size,
        price,
        mainImage,
        images
      };
      console.log(data);
      axios({
        method: "POST",
        url: "http://localhost:9090/properties/create",
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        data: data
      }).then(res => {
        if (res.status === 200) {
          setMessage(`New property ${title} created.`);
        } else setMessage("Failed to add property.");
      });
    } else setMessage("Data missing.");
  };

  return (
    <>
      <h1>Add Property</h1>
      <form>
        <label htmlFor="propertyTitleInput">Title</label>
        <input
          type="text"
          id="propertyTitleInput"
          onChange={event => setTitle(event.target.value)}
        ></input>
        <br></br>
        <label htmlFor="propertyTypeInput">Type</label>
        <select
          type="text"
          id="propertyTypeInput"
          onChange={event => setType(event.target.value)}
        >
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="room">Room</option>
        </select>
        <br></br>
        <label htmlFor="propertyStreet">Street</label>
        <input
          type="text"
          id="propertyStreet"
          onChange={event => setStreet(event.target.value)}
        ></input>
        <br></br>
        <label htmlFor="propertyPostalCode">Postal Code</label>
        <input
          type="text"
          id="propertyPostalCode"
          onChange={event => setPostalCode(event.target.value)}
        ></input>
        <br></br>
        <label htmlFor="propertyCity">City</label>
        <input
          type="text"
          id="propertyCity"
          onChange={event => setCity(event.target.value)}
        ></input>
        <br></br>
        <label htmlFor="propertyCountry">Country</label>
        <input
          type="text"
          id="propertyCountry"
          onChange={event => setCountry(event.target.value)}
        ></input>
        <br></br>
        <label htmlFor="propertyBedrooms">Bedrooms</label>
        <input
          type="number"
          id="propertyBedrooms"
          onChange={event => setBedrooms(event.target.value)}
        ></input>
        <br></br>
        <label htmlFor="propertyGuests">Guests #</label>
        <input
          type="number"
          id="propertyGuests"
          onChange={event => setGuestCapacity(event.target.value)}
        ></input>
        <br></br>
        <label htmlFor="propertyBathrooms">Bathrooms</label>
        <input
          type="number"
          id="propertyBathrooms"
          onChange={event => setBathrooms(event.target.value)}
        ></input>
        <br></br>
        <label htmlFor="propertySqm">Size</label>
        <input
          type="number"
          id="propertySqm"
          onChange={event => setSize(event.target.value)}
        ></input>
        <br></br>
        <label htmlFor="propertyPriceInput">Price</label>
        <input
          type="number"
          id="propertyPriceInput"
          onChange={event => setPrice(event.target.value)}
        ></input>
        <br></br>
        <label htmlFor="propertyDescription">Description</label>
        <textarea
          maxLength="250"
          id="propertyDescription"
          onChange={event => setDescription(event.target.value)}
        ></textarea>
        <br></br>
        <label htmlFor="mainImageInput">Main Image</label>
        <input
          id="mainImageInput"
          type="file"
          alt="my property"
          accept="image/png, image/jpg, image/jpeg"
          onChange={event => setMainImage(event.target.value)}
        ></input>
        <br></br>
        <label htmlFor="imagesInput">Images</label>
        <input
          id="imagesInput"
          type="file"
          alt="my properties"
          accept="image/png, image/jpg, image/jpeg"
          multiple
          onChange={event => setImages(event.target.value)}
        ></input>
        <br></br>
        <button onClick={handleClick}>Add Property</button>
      </form>
      <h2>{message}</h2>
    </>
  );
};
export default AddProperty;
