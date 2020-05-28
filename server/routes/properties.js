const router = require("express").Router();
const app = require("express");
const multer = require("multer");
const mime = require("mime");
const isAuthenticated = require("../helpers/auth_backend");
const User = require("../models/User");
const Property = require("../models/Property");
const Location = require("../models/Location");

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/../files/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + mime.getExtension(file.mimetype)
    );
  },
});
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
      title,
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
