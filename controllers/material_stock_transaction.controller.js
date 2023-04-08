const {
  getMaterialsAttributeList,
  getMSTAttributeList,
  STOCK_TRANSACTION_TYPES,
} = require("../constants");
const { queryGenerator } = require("../helpers");
const { MaterialStockTransactions, Materials } = require("../models");
const _ = require("lodash");
const { Op } = require("sequelize");

exports.create = async (req, res, next) => {
  try {
    let data = await MaterialStockTransactions.create(req.body);
    if (!data)
      return res.status(422).json({
        status: false,
        message:
          "Something went wrong! material stock transaction not created.",
      });
    await data.reload({
      attributes: getMSTAttributeList(req.body?.stock_transaction_type),
      include: [
        {
          model: Materials,
          attributes: getMaterialsAttributeList("dropdown"),
        },
      ],
    });
    res.status(201).json({
      status: true,
      message: "Material stock transaction created successfully.",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllTransaction = async (req, res, next) => {
  try {
    const data = await MaterialStockTransactions.findAndCountAll({
      ...queryGenerator({
        query: req.query,
        searchColumns: ["remark"],
        filterColumns: ["id", "stock_transaction_type"],
      }),
      attributes: getMSTAttributeList(req.query?.stock_transaction_type),
      include: [
        {
          model: Materials,
          attributes: getMaterialsAttributeList("dropdown"),
        },
      ],
    });
    res.status(200).json({
      status: true,
      message: "Successfully retrieved all employees.",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getLastTransactionDetail = async (req, res, next) => {
  try {
    const { material_id, stock_transaction_type } = req.query;
    const data = await MaterialStockTransactions.findOne({
      where: {
        material_id,
        stock_transaction_type:
          stock_transaction_type === STOCK_TRANSACTION_TYPES.INWARDING
            ? STOCK_TRANSACTION_TYPES.OUTWARDING
            : STOCK_TRANSACTION_TYPES.INWARDING,
      },
    });
    if (!data)
      return res.status(422).json({
        status: false,
        message:
          "Something went wrong! We are not able to fetch last day transaction.",
      });
    data = data?.get();
    if (stock_transaction_type === STOCK_TRANSACTION_TYPES.INWARDING)
      return res.status(200).json({
        status: true,
        message:
          "Successfully retrieved information about last day transaction.",
        data: _.pick(data, ["opening_stock"]),
      });

    const to_date_consumption = await MaterialStockTransactions.sum(
      "today_consumption",
      {
        where: {
          material_id: material_id,
          stock_transaction_type: STOCK_TRANSACTION_TYPES.OUTWARDING,
          date: sequelize.where(
            sequelize.fn(
              "MONTH",
              sequelize.col("date"),
              new Date().getMonth() + 1
            )
          ),
        },
      }
    );
    return res.status(200).json({
      status: true,
      message: "Successfully retrieved information about last day transaction.",
      data: { ..._.pick(data, ["total_opening_stock"]), to_date_consumption },
    });
  } catch (error) {
    next(error);
  }
};
