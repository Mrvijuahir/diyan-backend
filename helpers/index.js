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
