const { Model } = require("objection");

class Rent extends Model {
  static get tableName() {
    return "rents";
  }
}

module.exports = Rent;
