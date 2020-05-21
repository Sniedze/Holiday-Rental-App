const { Model } = require("objection");

class Image extends Model {
  static get tableName() {
    return "images";
  }
}

module.exports = Image;
