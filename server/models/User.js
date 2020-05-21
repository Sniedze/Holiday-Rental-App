const { Model } = require("objection");
const Property = require("./Property");

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    return {
      relation: Model.HasManyRelation,
      modelClass: Property,
      join: {
        from: "user.id",
        through: {
          from: "user_properties.user_id",
          to: "user_properties.property_id",
        },
        to: "property.id",
      },
    };
  }
}

module.exports = User;
