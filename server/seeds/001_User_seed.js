const bcrypt = require("bcrypt");
const password = "bob666666";
const hash = bcrypt.hashSync(password, 10);

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          first_name: "John",
          last_name: "Doe",
          email: "bob@bob.com",
          password: hash,
        },
      ]);
    });
};
