const express = require("express");
const app = express();
//CORS
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
// Initialize express-session
const session = require("express-session");
// Store sessions in MySQL database using Knex (sessions MUST be stored outside of cache)
const KnexSessionStore = require("connect-session-knex")(session);
// Secret key for session
const key = require("./config/key");
// parse application/json
app.use(express.json());
/* Setup the database */

const { Model } = require("objection");
const Knex = require("knex");
const knexFile = require("./knexfile.js");

const knex = Knex(knexFile.development);

// Give the knex instance to objection.
Model.knex(knex);
//initializes KnexSessionStore
const store = new KnexSessionStore({ knex });

// Implements express-session
app.use(
  session({
    secret: key.secret,
    name: "user_sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    },
    store: store
  })
);

// Users routes
const usersRoute = require("./routes/users.js");
app.use(usersRoute);

/* Start the server, KEEP AT THE BOTTOM  */
const port = process.env.PORT || 9090;

const server = app.listen(port, error => {
  if (error) {
    console.log("Error running Express");
  }
  console.log("Server is running on port", server.address().port);
});
