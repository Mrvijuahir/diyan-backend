const { Admin, Employees } = require("../models");
const jwt = require("jsonwebtoken");
const { USER_ROLES } = require("../constants");

exports.validate =
  (bodySchema, paramsSchema = null, queryParamsSchema = null) =>
  (req, res, next) => {
    try {
      const options = {
        abortEarly: false,
      };
      let paramsErrors = [];
      let queryParamsErrors = [];
      let bodyErrors = [];
      if (paramsSchema) {
        let result = paramsSchema.validate(req.params, options);
        if (result.error) {
          const { details } = result?.error;
          paramsErrors = details?.map(({ message, path }) => ({
            message: message?.replace(/\"/g, ""),
            key: path[0],
          }));
        }
      }
      if (queryParamsSchema) {
        let result = queryParamsSchema.validate(req.query, options);
        if (result.error) {
          const { details } = result?.error;
          queryParamsErrors = details?.map(({ message, path }) => ({
            message: message?.replace(/\"/g, ""),
            key: path[0],
          }));
        }
      }
      if (bodySchema) {
        let result = bodySchema.validate(req.body, options);
        if (result.error) {
          const { details } = result?.error;
          bodyErrors = details?.map(({ message, path }) => ({
            message: message?.replace(/\"/g, ""),
            key: path[0],
          }));
        }
      }
      if (
        bodyErrors?.length ||
        paramsErrors?.length ||
        queryParamsErrors?.length
      )
        return res.status(422).json({
          status: false,
          message: "The given data was invalid.",
          data: {
            bodyErrors,
            paramsErrors,
            queryParamsErrors,
          },
        });
      next();
    } catch (error) {
      next(error);
    }
  };

exports.verifyToken = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    token = token?.split(" ")[1];
    console.log("token", token);
    if (!token)
      return res.status(404).json({
        status: false,
        message: "Token not found!",
      });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload?.id || !payload?.role)
      return res.status(401).json({
        status: false,
        message: " Invalid token.",
      });
    let user = null;
    if (payload?.role === USER_ROLES.ADMIN) {
      user = await Admin.findByPk(payload?.id);
    } else if (payload?.role === USER_ROLES.USER) {
      user = await Employees.findByPk(payload?.id);
    }
    if (!user)
      return res.status(404).json({
        status: false,
        message: "Your data not found.",
      });
    req.role = payload?.role;
    req.jwtPayload = payload;
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError)
      return res.status(401).json({
        status: false,
        message: "Your login session has been expired. Please login again.",
      });
    if (error instanceof jwt.JsonWebTokenError)
      return res.status(401).json({
        status: false,
        message: "Invalid token.",
      });
    next(error);
  }
};
