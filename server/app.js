const express = require("express");
const app = express();

// Initialize express-session
const session = require("express-session");

app.use(
  session({
    secret: `this is a secret and shouldn't be shared in version control etc.`,
    resave: false,
    saveUninitialized: true,
  })
);

// Users routes
const usersRoute = require("./routes/users.js");
app.use(usersRoute);

/* Start the server, KEEP AT THE BOTTOM  */
const port = process.env.PORT || 9090;

const server = app.listen(port, (error) => {
  if (error) {
    console.log("Error running Express");
  }
  console.log("Server is running on port", server.address().port);
});
