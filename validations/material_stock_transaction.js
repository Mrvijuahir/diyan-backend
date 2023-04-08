const Joi = require("joi");
const { STOCK_TRANSACTION_TYPES } = require("../constants");

module.exports = {
  createJoiSchema: Joi.object().keys({
    date: Joi.string().required().label("Date"),
    material_id: Joi.number().positive().integer().required("Material Name"),
    remark: Joi.string().required().label("Remark"),
    stock_transaction_type: Joi.string()
      .valid(...Object.values(STOCK_TRANSACTION_TYPES))
      .required()
      .label("Stock transaction type"),
    opening_stock: Joi.number()
      .positive()
      .integer()
      .when("stock_transaction_type", {
        is: Joi.valid(STOCK_TRANSACTION_TYPES.INWARDING),
        then: Joi.required(),
      })
      .label("Opening Stock"),
    receive_qty: Joi.number()
      .positive()
      .integer()
      .when("stock_transaction_type", {
        is: Joi.valid(STOCK_TRANSACTION_TYPES.INWARDING),
        then: Joi.required(),
      })
      .label("Receive QTY"),
    total_opening_stock: Joi.number()
      .positive()
      .integer()
      .required()
      .label("Total opening stock"),
    today_consumption: Joi.number()
      .positive()
      .integer()
      .when("stock_transaction_type", {
        is: Joi.valid(STOCK_TRANSACTION_TYPES.OUTWARDING),
        then: Joi.required(),
      })
      .label("Today consumption"),
    to_date_consumption: Joi.number()
      .positive()
      .integer()
      .when("stock_transaction_type", {
        is: Joi.valid(STOCK_TRANSACTION_TYPES.OUTWARDING),
        then: Joi.required(),
      })
      .label("To date consumption"),
    closing_stock: Joi.number()
      .positive()
      .integer()
      .when("stock_transaction_type", {
        is: Joi.valid(STOCK_TRANSACTION_TYPES.OUTWARDING),
        then: Joi.required(),
      })
      .label("Closing stock"),
  }),
};
