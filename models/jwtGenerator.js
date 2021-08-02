const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(id) {
  const payload = {
    user: id,
  };
  //assign a token based on payload, and secret. Has an expiration time.
  return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "1hr"});
};

module.exports = jwtGenerator;