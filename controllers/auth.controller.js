const { generateJwtToken } = require("../helpers");
const { Admin, Employees } = require("../models");
const { USER_ROLES } = require("../constants");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req?.body;
    let user = await Admin.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      const employee = await Employees.findOne({
        where: {
          email,
        },
      });
      if (!employee)
        return res.status(404).json({
          status: false,
          message: "Invalid email or password!",
        });
      res.status(200).json({
        status: true,
        message: "Login successful.",
        token: generateJwtToken({ id: employee?.id, role: USER_ROLES.USER }),
      });
    }
    if (!user.isValidPassword(password))
      return res.status(404).json({
        status: false,
        message: "Invalid email or password!",
      });

    res.status(200).json({
      status: true,
      message: "Login successful.",
      token: generateJwtToken({ id: user?.id, role: USER_ROLES.ADMIN }),
    });
  } catch (error) {
    next(error);
  }
};
