const router = require("express").Router();
const crypto = require("crypto");
const multer = require("multer");
const mime = require("mime");
const { isAuthenticated } = require("../helpers/auth_backend");
const User = require("../models/User");
const Property = require("../models/Property");
const Location = require("../models/Location");
const Image = require("../models/Image");
const UserProperties = require("../models/UserProperties");

const imageStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, __dirname + "/../files/images"); // cb = part of multer, callback
  },
  filename: function(req, file, cb) {
    cb(
      null,
      crypto.randomBytes(16).toString("hex") +
        "." +
        mime.getExtension(file.mimetype)
    );
  }
});
const uploadImages = multer({ storage: imageStorage });

//////////////////////////ENDPOINTS

///////////Get User Properties
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
  const { city, country, guest_capacity } = req.query;
  console.log(req.query);
  if (city && country && guest_capacity) {
    try {
      const results = await Property.query()
        .select("properties.*", "locations.*", "images.name as image_name")
        .joinRelated("[locations, images]")
        .where("locations.city", city)
        .where("locations.country", country)
        .where("properties.guest_capacity", ">=", guest_capacity);
      console.log(results);
      return res.status(200).send({ results });
    } catch (error) {
      console.log(error);
    }
  }
  return res.status(404).send("Missing query data");
});

/////////////////////////Post a property
router.post(
  "/properties/create",
  isAuthenticated,
  uploadImages.fields([{ name: "mainImage", maxCount: 1 }]),
  async (req, res) => {
    if (req.files.mainImage[0]) {
      const userId = req.session.user.id;
      const mainImage = {
        filename: req.files.mainImage[0].filename,
        size: req.files.mainImage[0].size
      };

      const {
        title,
        type,
        bedrooms,
        bathrooms,
        size,
        price,
        description,
        guestCapacity,
        street,
        postalCode,
        city,
        country
      } = req.body;

      //This is hell
      /////////////////////////NEEDS TO BE A TRANSACTION IN CASE OF FAILURE!!!!!!!!!!!!!!!!!!!!!!
      let imageId = null;
      return await Image.query()
        .insert({ name: mainImage.filename, size: mainImage.size })
        .then(image => {
          imageId = image.id;
          return Location.query().insert({
            street,
            postal_code: postalCode,
            city,
            country
          });
        })
        .then(location => {
          return Property.query().insert({
            title,
            type,
            description,
            bedrooms,
            guest_capacity: guestCapacity,
            bathrooms,
            size,
            price,
            location_id: location.id,
            image_id: imageId
          });
        })
        .then(property => {
          return UserProperties.query().insert({
            property_id: property.id,
            user_id: userId
          });
        })
        .then(
          res.status(200).send({
            response: "Property added"
          })
        );
    }
  }
);

module.exports = router;
