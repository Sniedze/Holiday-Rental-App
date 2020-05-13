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
      table.string("postal_code").notNullable();
      table.string("city").notNullable();
      table.string("country").notNullable();
    })
    .createTable("images", (table) => {
      table.increments("id").notNullable();
      table.string("path").notNullable();
      table.string("name").notNullable();
      table.integer("size").notNullable();
    })
    .createTable("properties", (table) => {
      table.increments("id");
      table.string("title").notNullable();
      table.enum("type", ["house", "apartment", "room"]).notNullable();
      table.string("description").notNullable();
      table.integer("bedrooms").notNullable();
      table.integer("bathrooms").notNullable();
      table.integer("size").notNullable();
      table.boolean("is_available").defaultTo(true);
      table.float("price").notNullable();
      table.integer("location_id").unsigned().notNullable();
      table
        .foreign("location_id")
        .references("locations.id")
        .inTable("locations")
        .onDelete("cascade")
        .onUpdate("cascade");
      table.integer("image_id").unsigned().notNullable();
      table
        .foreign("image_id")
        .references("images.id")
        .inTable("images")
        .onDelete("cascade")
        .onUpdate("cascade");
    })
    .createTable("user_properties", (table) => {
      table.integer("property_id").unsigned().notNullable();
      table
        .foreign("property_id")
        .references("properties.id")
        .inTable("properties")
        .onDelete("cascade")
        .onUpdate("cascade");
      table.integer("user_id").unsigned().notNullable();
      table
        .foreign("user_id")
        .references("users.id")
        .inTable("users")
        .onDelete("cascade")
        .onUpdate("cascade");
    })
    .createTable("rents", (table) => {
      table.integer("property_id").unsigned().notNullable();
      table
        .foreign("property_id")
        .references("properties.id")
        .inTable("properties")
        .onDelete("cascade")
        .onUpdate("cascade");
      table.date("check_in").notNullable();
      table.date("check_out").notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("properties")
    .dropTableIfExists("locations")
    .dropTableIfExists("user_properties")
    .dropTableIfExists("images")
    .dropTableIfExists("rents");
};
