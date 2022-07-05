const jwt = require("jsonwebtoken");
const knex = require("../db");

const genrateToken = ({ id }) => {
  return jwt.sign(id, "pradeeepjh43$%#FHGF$#&34v387%&^4tzmtno");
};

const verifyToken = async (req, res, next) => {
  if (req.headers.cookie) {
    const token = req.headers.cookie.split("=")[1];
    const id = jwt.verify(token, "pradeepjh43$%#FHGF$#&34v387%&^4tzmtno");
    const user = await knex("customers").where({ id });
    req.userData = user;
    next();

  } else{
    res.send('token expired')
  }
};

module.exports = {
  genrateToken,
  verifyToken
};