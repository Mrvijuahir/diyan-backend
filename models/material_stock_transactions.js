const { DataTypes } = require("sequelize");
const { sequelize, Model, getTableConfigs } = require("../configs/mysql");
const { STOCK_TRANSACTION_TYPES } = require("../constants");

class MaterialStockTransactions extends Model {
  static associate(models) {
    MaterialStockTransactions.belongsTo(models.Materials, {
      foreignKey: "material_id",
      targetKey: "id",
    });
  }
}

MaterialStockTransactions.init(
  {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    material_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "materials",
        key: "id",
      },
    },
    opening_stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    receive_qty: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    total_opening_stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    today_consumption: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    to_date_consumption: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    closing_stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    remark: {
      type: DataTypes.STRING,
    },
    stock_transaction_type: {
      type: DataTypes.ENUM(...Object.values(STOCK_TRANSACTION_TYPES)),
      allowNull: false,
    },
  },
  {
    ...getTableConfigs(sequelize, "material_stock_transactions"),
    hooks: {
      beforeCreate: async (data) => {
        const transData = data?.get();
        let lastTrans = await MaterialStockTransactions.findOne({
          where: {
            material_id: transData?.material_id,
            stock_transaction_type:
              transData?.stock_transaction_type ===
              STOCK_TRANSACTION_TYPES.INWARDING
                ? STOCK_TRANSACTION_TYPES.OUTWARDING
                : STOCK_TRANSACTION_TYPES.INWARDING,
          },
          order: [["id", "DESC"]],
        });
        lastTrans = lastTrans ? lastTrans?.get() : null;
        // InWarding calculation
        if (
          transData?.stock_transaction_type ===
          STOCK_TRANSACTION_TYPES.INWARDING
        ) {
          data.setDataValue("date", new Date());
          data.setDataValue("opening_stock", lastTrans?.closing_stock || 0);
          data.setDataValue(
            "total_opening_stock",
            (lastTrans?.closing_stock || 0) + transData?.receive_qty
          );
        } else {
          // OutWarding calculation
          data.setDataValue("date", new Date());
          data.setDataValue(
            "total_opening_stock",
            lastTrans?.total_opening_stock || 0
          );
          data.setDataValue(
            "closing_stock",
            (lastTrans?.total_opening_stock || 0) - transData?.today_consumption
          );
          const curMonthtrans = await MaterialStockTransactions.sum(
            "today_consumption",
            {
              where: {
                material_id: transData?.material_id,
                stock_transaction_type: STOCK_TRANSACTION_TYPES.OUTWARDING,
                date: sequelize.where(
                  sequelize.fn("MONTH", sequelize.col("date")),
                  new Date().getMonth() + 1
                ),
              },
            }
          );
          data.setDataValue("to_date_consumption", curMonthtrans || 0);
        }
      },
    },
  }
);

module.exports = MaterialStockTransactions;
