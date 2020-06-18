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
router.get("/user/properties", isAuthenticated, async (req, res) => {
  const { id } = req.session.user;
  const user = await User.query().findById(id);

  const usersProperties = await user
    .$relatedQuery("properties")
    .withGraphFetched("locations")
    .withGraphFetched("images");
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
        .select("properties.*", "locations.*", "images.name")
        .joinRelated("[locations, images]")
        .where("locations.city", city)
        .where("locations.country", country)
        .where("properties.guest_capacity", ">=", guest_capacity);
      return res.status(200).send({ results });
    } catch (error) {
      console.log(error);
    }
  }
  return res.status(404).send("Missing query data");
});

router.get("/property/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.query()
      .findById(id)
      .select("properties.*", "locations.*", "images.name")
      .joinRelated("[locations, images]");
    return res.status(200).send({ property });
  } catch (error) {
    console.log(error);
  }
});

/////////////////////////Post a property
const propertyFiles = uploadImages.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "images", maxCount: 6 }
]);
router.post(
  "/properties/create",
  isAuthenticated,
  propertyFiles,
  async (req, res) => {
    if (req.files.mainImage[0] && req.files.images) {
      const userId = req.session.user.id;
      const images = [];
      const mainImage = {
        name: req.files.mainImage[0].filename,
        size: req.files.mainImage[0].size
      };
      req.files.images.forEach(img => {
        images.push({ name: img.filename, size: img.size });
      });
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

      try {
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
      } catch (error) {
        res.status(500).send({
          response: "DB error"
        });
      }
    }
  }
);

module.exports = router;
