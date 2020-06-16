const { Model } = require("objection");
const User = require("./Property");

class Location extends Model {
  static get tableName() {
    return "locations";
  }
}

module.exports = Location;
