const uuidv4 = require("uuid").v4;

/**
 *
 * @param {String || Object || Array} files i.e. filename, file object, file object array, filename array
 * @returns unique file name like 438bf492-093b-405b-806f-ac9bdc98929d.jpg
 */
exports.getUniqueFileName = (files = null, folderPath = "") => {
  if (typeof files === "string")
    return `${folderPath ? folderPath + "/" : ""}${uuidv4()}.${files
      .split(".")
      .pop()}`;
  else if (typeof files === "object")
    if (Array.isArray(files))
      if (typeof files[0] === "string")
        return files.map(
          (file) =>
            `${folderPath ? folderPath + "/" : ""}${uuidv4()}.${file
              .split(".")
              .pop()}`
        );
      else
        return files.map(
          (file) =>
            `${
              folderPath ? folderPath + "/" : ""
            }${uuidv4()}.${file.originalname.split(".").pop()}`
        );
    else
      return `${
        folderPath ? folderPath + "/" : ""
      }${uuidv4()}.${files.originalname.split(".").pop()}`;
  else return uuidv4();
};

/**
 *
 * @param {String | Number} text
 * @returns base64 encrypted text
 */
exports.base64Encrypt = (text) => Buffer.from(String(text)).toString("base64");

/**
 *
 * @param {String} text
 * @returns base64 decrypted text
 */
exports.base64Decrypt = (text) =>
  Buffer.from(String(text), "base64").toString("ascii");

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
