const router = require("express").Router();

const bcrypt = require("bcrypt");
const saltRounds = 10;
//#############################################
/*
GET /users
GET /users/[userId]
POST /users
DELETE /users/[userId] -- (HTML) GET users/delete/[userId] 
PUT /users/[userId] -- update everything in the user object, except id
PATCH /users/[userId] -- change only some parts of the user
*/
//#############################################
module.exports = router;
