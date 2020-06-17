const { Model } = require("objection");
const Property = require("./Property");

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    return {
      properties: {
        relation: Model.ManyToManyRelation,
        modelClass: Property,
        join: {
          from: "users.id",
          through: {
            from: "user_properties.user_id",
            to: "user_properties.property_id",
          },
          to: "properties.id",
        },
      },
    };
  }
}

module.exports = User;
