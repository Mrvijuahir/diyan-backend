const { generateJwtToken } = require("../helpers");
const { Users } = require("../models");

exports.signup = async (req, res, next) => {
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
      message: "Signup successful.",
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req?.body;
    let user = await Users.findOne({
      where: {
        email,
      },
    });
    if (!user || !user.isValidPassword(password))
      return res.status(404).json({
        status: false,
        message: "Invalid email or password!",
      });
    res.status(200).json({
      status: true,
      message: "Login successful.",
      token: generateJwtToken({ id: user?.id, role: user?.role }),
    });
  } catch (error) {
    next(error);
  }
};
