const { Users } = require("../models");

exports.getUser = async (req, res, next) => {
  try {
    const user = await Users.findByPk(req.user?.get()?.id, {
      attributes: {
        exclude: ["password", "deleted_at"],
      },
    });
    if (!user) throw new Error("Your data not found.");
    res.status(200).json({
      status: true,
      message: "Your data fetched successful.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
