const { Users } = require("../models");

exports.signup = async (req, res, next) => {
  try {
    const user = await Users.create(req.body);
    if (!user)
      throw new Error(
        "Your account not created. Please check your information."
      );
    res.status(201).json({
      status: true,
      message: "Account created successfully.",
    });
  } catch (error) {
    next(error);
  }
};
