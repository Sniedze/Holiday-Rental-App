const router = require("express").Router();
const crypto = require("crypto");
const app = require("express");
const multer = require("multer");
const mime = require("mime");
const isAuthenticated = require("../helpers/auth_backend");
const User = require("../models/User");
const Property = require("../models/Property");
const Location = require("../models/Location");
const Image = require("../models/Image");

const imageStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, __dirname + "/../files/images"); // cb = part of multer, callback
  },
  filename: async function(req, file, cb) {
    const imageName =
      crypto.randomBytes(16).toString("hex") +
      "." +
      mime.getExtension(file.mimetype);
    cb(null, imageName);
    const newImage = await Image.query().insert({
      name: imageName
    });
  }
}); ///
const uploadImages = multer({ storage: imageStorage });

router.get("/user/properties", async (req, res) => {
  const { id } = req.session.user;
  const user = await User.query().findById(id);
  const usersProperties = await user.$relatedQuery("properties");
  try {
    if (usersProperties) {
      return res.status(200).send({ usersProperties: usersProperties });
    }
  } catch (error) {
    return res.status(404).send({ response: "No properties found" });
  }
});

router.get("/properties/search", async (req, res) => {
  const { city, country, guests } = req.query;
  //console.log(req.query);
  if (city && country && guests) {
    try {
      const results = await Property.query()
        .select("properties.*", "location.*", "images.name")
        .join("images", { "properties.image_id": "image.id" })
        .join("locations", { "properties.location_id": "locations.id" })
        .where("locations.city", city)
        .where("locations.country", country)
        .where("properties.guests", ">=", guests);
      console.log(results);
      return res.status(200).send("Success");
    } catch (error) {
      console.log(error);
    }
  }
  return res.status(404).send("Missing query data");
});

router.post(
  "/properties/create",
  uploadImages.fields([{ name: "mainImage", maxCount: 1 }]),
  (req, res, next) => {
    console.log(req.session);
    if (req.session.user) {
      console.log("Is auth");
    } else {
      console.log("not auth");
    }
    const jsonData = JSON.stringify(req.body);
    console.log(jsonData);

    const {
      title
      // type,
      // street,
      // postalCode,
      // city,
      // country,
      // bedrooms,
      // bathrooms,
      // size,
      // price,
      // description,
      // guestCapacity,
    } = jsonData;
    res.send(req.body);
  }
);

module.exports = router;
