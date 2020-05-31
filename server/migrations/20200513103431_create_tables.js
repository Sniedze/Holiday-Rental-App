exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id");
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("email").notNullable();
      table.string("password").notNullable();
    })
    .createTable("locations", (table) => {
      table.increments("id").notNullable();
      table.string("street").notNullable();
      table.string("postal_code").notNullable();
      table.string("city").notNullable();
      table.string("country").notNullable();
      table.index(["city", "country"]);
    })
    .createTable("images", (table) => {
      table.increments("id").notNullable();
      table.string("name").notNullable();
      table.integer("size").notNullable();
    })
    .createTable("properties", (table) => {
      table.increments("id");
      table.string("title").notNullable();
      table.enum("type", ["house", "apartment", "room"]).notNullable();
      table.string("description").notNullable();
      table.integer("bedrooms").notNullable();
      table.integer("guest_capacity").notNullable();
      table.integer("bathrooms").notNullable();
      table.integer("size").notNullable();
      table.float("price").notNullable();
      table.integer("location_id").unsigned().notNullable();
      table
        .foreign("location_id")
        .references("id")
        .inTable("locations")
        .onDelete("cascade")
        .onUpdate("cascade");
      table.integer("image_id").unsigned().notNullable();
      table
        .foreign("image_id")
        .references("id")
        .inTable("images")
        .onDelete("cascade")
        .onUpdate("cascade");
      table.index(["guest_capacity", "type"]);
    })
    .createTable("user_properties", (table) => {
      table.integer("property_id").unsigned().notNullable();
      table
        .foreign("property_id")
        .references("id")
        .inTable("properties")
        .onDelete("cascade")
        .onUpdate("cascade");
      table.integer("user_id").unsigned().notNullable();
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("cascade")
        .onUpdate("cascade");
    })
    .createTable("rents", (table) => {
      table.increments("id").notNullable();
      table.integer("property_id").unsigned().notNullable();
      table
        .foreign("property_id")
        .references("id")
        .inTable("properties")
        .onDelete("cascade")
        .onUpdate("cascade");
      table.date("check_in").notNullable();
      table.date("check_out").notNullable();
      table.index(["check_in", "check_out"]);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("rents")
    .dropTableIfExists("user_properties")
    .dropTableIfExists("properties")
    .dropTableIfExists("locations")
    .dropTableIfExists("images")
    .dropTableIfExists("users");
};
