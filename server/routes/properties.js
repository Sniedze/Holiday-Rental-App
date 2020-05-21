const router = require("express").Router();
const isAuthenticated = require("../helpers/auth_backend");
const User = require("../models/User");
const Property = require("../models/Property");
const Location = require("../models/Location");

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

router.post("/properties/create", async (req, res, next) => {
  const {
    title,
    type,
    street,
    postalCode,
    city,
    country,
    bedrooms,
    bathrooms,
    size,
    price,
    description,
    mainImage,
    images,
    guestCapacity,
  } = req.body;

  res.send(req.body);
});

module.exports = router;
