import React from "react";

const AddProperty = () => {
  return (
    <>
      <h1>Profile</h1>
      <form>
        <label for="propertyTitleInput">Title</label>
        <input type="text" id="propertyTitleInput"></input>
        <br></br>
        <label for="propertyTypeInput">Type</label>
        <select type="text" id="propertyTypeInput">
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="room">Room</option>
        </select>
        <br></br>
        <label for="propertyStreet">Street</label>
        <input type="text" id="propertyStreet"></input>
        <br></br>
        <label for="propertyPostalCode">Postal Code</label>
        <input type="text" id="propertyPostalCode"></input>
        <br></br>
        <label for="propertyCity">City</label>
        <input type="text" id="propertyCity"></input>
        <br></br>
        <label for="propertyCountry">Country</label>
        <input type="text" id="propertyCountry"></input>
        <br></br>
        <label for="propertyBedrooms">Bedrooms</label>
        <input type="number" id="propertyBedrooms"></input>
        <br></br>
        <label for="propertyBathrooms">Bathrooms</label>
        <input type="number" id="propertyBathrooms"></input>
        <br></br>
        <label for="propertySqm">Size</label>
        <input type="number" id="propertySqm"></input>
        <br></br>
        <label for="propertyPriceInput">Price</label>
        <input type="number" id="propertyPriceInput"></input>
        <br></br>
        <label for="propertyDescription">Description</label>
        <textarea maxlength="250" id="propertyDescription"></textarea>
        <br></br>
        <label for="mainImageInput">Main Image</label>
        <input
          id="mainImageInput"
          type="file"
          alt="my property"
          accept="image/png, image/jpg, image/jpeg"
        ></input>
        <br></br>
        <label for="imagesInput">Images</label>
        <input
          id="imagesInput"
          type="file"
          alt="my properties"
          accept="image/png, image/jpg, image/jpeg"
          multiple
        ></input>
        <br></br>
      </form>
    </>
  );
};
export default AddProperty;
