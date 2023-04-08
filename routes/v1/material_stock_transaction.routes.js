const router = require("express").Router();
const {
  create,
  getAllTransaction,
  getLastTransactionDetail,
} = require("../../controllers/material_stock_transaction.controller");
const {
  createJoiSchema,
} = require("../../validations/material_stock_transaction");
const { validate } = require("../../middlewares");

// TODO test apis
router.get("/last-transaction-detail", getLastTransactionDetail);
router
  .route("/")
  .post(validate(createJoiSchema), create)
  .get(getAllTransaction);

module.exports = router;
