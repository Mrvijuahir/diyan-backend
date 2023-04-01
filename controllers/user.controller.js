const { Users } = require("../models");
const {
  sendAccountVerificationEmail,
  sendResetPasswordEmail,
} = require("../services/emails");

exports.signup = async (req, res, next) => {
  try {
    const user = await Users.create(req.body, { hooks: true });
    if (!user)
      throw new Error(
        "Your account not created. Please check your information."
      );
    await sendAccountVerificationEmail(user);
    res.status(201).json({
      status: true,
      message:
        "Account created successfully. Please check your email for account verification.",
    });
  } catch (error) {
    next(error);
  }
};

exports.verifyAccount = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.tokenPayload?.email,
      },
    });
    if (!user) throw new Error("User not found!");
    if (user?.get()?.is_verified)
      throw new Error("Your account already verified.");
    await user.update({ is_verified: true });
    res.status(200).json({
      status: true,
      message: "Your account verified successful.",
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({
      where: {
        email,
      },
    });
    if (!user) throw new Error("Invalid email or password.");
    if (!user.isValidPassword(password))
      throw new Error("Invalid email or password.");
    if (!user.is_verified) {
      await sendAccountVerificationEmail(user);
      throw new Error(
        "Account not verified. Please check your email and verify account."
      );
    }
    res.status(200).json({
      status: true,
      message: "Login successful.",
      token: "",
    });
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await Users.findOne({
      where: { email },
    });
    if (!user) throw new Error("Invalid email!");
    await sendResetPasswordEmail(user);
    res.status(200).json({
      status: true,
      message: "Please check your email for forgot password.",
    });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const user = await Users.findOne({
      where: {
        email: req.tokenPayload?.email,
      },
    });
    if (!user) throw new Error("User not found!");
    await user.update({ password });
    res.status(200).json({
      status: true,
      message: "Your password reset successful.",
    });
  } catch (error) {
    next(error);
  }
};
