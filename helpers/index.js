const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { sequelize } = require("../configs/mysql");

/**
 *
 * @param {Object} payload
 * @param {String} expiresIn
 * @returns json web token with encrypted payload and default 1 day expire time
 */
exports.generateJwtToken = (payload = {}, expiresIn = "1d") =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });

/**
 *
 * @param {Number} min i.e. 1
 * @param {Number} max i.e. 10
 * @returns random number between min and max values i.e. 9
 */
exports.generateRandomNumberUsingMinMaxValue = (min = 1000, max = 9999) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 *
 * @param {Number} n i.e. 6
 * @returns random number with n digit which you pass in parameter i.e. 100000 to 999999
 */
exports.generateRandomNumberUsingLength = (n = 4) => {
  const min = Math.pow(10, n - 1);
  const max = Math.pow(10, n) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 *
 * @param {Object} query Api query params
 * @param {Array | Object} tablesInfo Tables with their releations
 * @returns order by and sort by with parent and child table columns
 */
exports.getOrderBy = (query = {}, tablesInfo) => {
  const { order_by = "id", sort_by = "DESC" } = query;
  const orderByArr = order_by?.split(".");
  if (orderByArr?.length > 1) {
    if (tablesInfo?.length) {
      return {
        order: [
          [
            ...orderByArr?.map((str, i, arr) =>
              i === arr?.length - 1
                ? str
                : tablesInfo?.filter((table) => table?.as === str)?.[0]
            ),
            sort_by,
          ],
        ],
      };
    }
    return {
      order: [[tablesInfo, orderByArr[1], sort_by]],
    };
  }
  return {
    order: [[order_by, sort_by]],
  };
};

/**
 *
 * @param {Object} query Api query params
 * @param {Array} columns Columns list in which you want to search
 * @param {Object} where Extra filters if you want to pass
 * @returns search query
 */
exports.getSearchQuery = (query = {}, columns = [], where = {}) => {
  const q = query?.q;
  if (!q) {
    return {
      where,
    };
  }
  return {
    where: {
      ...where,
      [Op.or]: columns?.map((columnName) => ({
        [columnName]: {
          [Op.like]: `%${q}%`,
        },
      })),
    },
  };
};

/**
 *
 * @param {Object} param {
 *    query: Request Query Object,
 *    orderByTablesInfo: order by tables info if you want to order by in child table,
 *    searchColumns: List of columns in which you want to search,
 *    where: Extra condition
 * }
 * @returns query
 */
exports.queryGenerator = ({
  query,
  orderByTablesInfo,
  searchColumns = [],
  where = {},
}) => {
  let obj = {
    ...this.getOrderBy(query, orderByTablesInfo),
  };
  if (Object.keys(where).length) {
    obj = {
      ...obj,
      where,
    };
  }
  let { limit, offset } = query;
  if (limit || offset) {
    obj = {
      ...obj,
      limit: +limit || 10,
      offset: +offset || 0,
    };
  }
  if (searchColumns?.length) {
    obj = {
      ...obj,
      ...this.getSearchQuery(query, searchColumns, where),
    };
  }
  return obj;
};
