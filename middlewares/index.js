const jwt = require("jsonwebtoken");

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

exports.decodeToken = async (req, res, next) => {
  try {
    let token = req.params?.token || req.body?.token || req.query?.token;

    const tokenPayload = jwt.decode(token);
    req.tokenPayload = tokenPayload;
    next();
  } catch (error) {
    next(error);
  }
};
