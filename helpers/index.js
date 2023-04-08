const jwt = require("jsonwebtoken");

/**
 *
 * @param {Object} payload
 * @param {String} expiresIn
 * @returns json web token with encrypted payload and default 1 day expire time
 */
exports.generateJwtToken = (payload = {}, expiresIn = "1d") =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });

/**
 *
 * @param {Number} min i.e. 1
 * @param {Number} max i.e. 10
 * @returns random number between min and max values i.e. 9
 */
exports.generateRandomNumberUsingMinMaxValue = (min = 1000, max = 9999) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 *
 * @param {Number} n i.e. 6
 * @returns random number with n digit which you pass in parameter i.e. 100000 to 999999
 */
exports.generateRandomNumberUsingLength = (n = 4) => {
  const min = Math.pow(10, n - 1);
  const max = Math.pow(10, n) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
