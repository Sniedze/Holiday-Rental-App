const { Model } = require("objection");
const User = require("./User");
const Property = require("./Property");

class UserProperties extends Model {
  static get tableName() {
    return "user_properties";
  }
  static get relationMappings() {
    return {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "user_properties.user_id",
        to: "users.id"
      },
      relation: Model.BelongsToOneRelation,
      modelClass: Property,
      join: {
        from: "user_properties.property_id",
        to: "properties.id"
      }
    };
  }
}

module.exports = UserProperties;
