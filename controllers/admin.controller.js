const { Users } = require("../models");

exports.create = async (req, res, next) => {
  try {
    const isAlreadyExist = await Users.count({ email: req.body?.email });
    if (isAlreadyExist)
      return res.status(422).json({
        status: false,
        message: "Email already in use!",
      });
    let user = await Users.create(req.body);
    if (!user)
      return res.status(422).json({
        status: false,
        message: "Something went wrong! Account not created.",
      });
    res.status(200).json({
      status: true,
      message: "Admin created successfully.",
    });
  } catch (error) {
    next(error);
  }
};
