const express = require("express");
const path = require("path");
const app = express();
const usersRoute = require("./routes/users.js");
const propertiesRoute = require("./routes/properties.js");

//CORS
const cors = require("cors");
// Initialize express-session
const session = require("express-session");
// Store sessions in MySQL database using Knex (sessions MUST be stored outside of cache)
const KnexSessionStore = require("connect-session-knex")(session);
// Secret key for session
const key = require("./config/key");

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.urlencoded({ extended: true }));
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
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 6000000,
    },
    store: store,
  })
);

// Users routes
app.use(usersRoute);
app.use(propertiesRoute);

app.use("/images", express.static(path.join(__dirname, "files", "images")));

/* Start the server, KEEP AT THE BOTTOM  */
const port = process.env.PORT || 9090;

const server = app.listen(port, (error) => {
  if (error) {
    console.log("Error running Express");
  }
  console.log("Server is running on port", server.address().port);
});
