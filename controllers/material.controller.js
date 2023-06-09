const { Op } = require("sequelize");
const { getMaterialsAttributeList } = require("../constants");
const { queryGenerator } = require("../helpers");
const { Materials } = require("../models");
const _ = require("lodash");

exports.addMaterial = async (req, res, next) => {
  try {
    const { material_name } = req.body;
    const isMaterialExist = await Materials.count({
      where: {
        material_name,
      },
    });
    if (isMaterialExist)
      return res.status(422).json({
        status: false,
        message: "Material already Exists",
      });
    let material = await Materials.create(req.body);
    material = material.get();
    res.status(200).json({
      status: true,
      message: "Material created successfully.",
      data: _.pick(material, getMaterialsAttributeList()),
    });
  } catch (error) {
    next(error);
  }
};

exports.updateMaterial = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { material_name } = req.body;
    if (material_name) {
      const isMaterialExist = await Materials.count({
        where: {
          material_name,
          id: {
            [Op.ne]: id,
          },
        },
      });
      if (isMaterialExist)
        return res.status(422).json({
          status: false,
          message: "Material already Exists",
        });
    }
    const isUpdate = await Materials.update(req.body, {
      where: {
        id,
      },
    });
    if (!isUpdate[0])
      return res.status(422).json({
        status: false,
        message: "Something went wrong! Role not updated.",
      });
    const role = await Materials.findByPk(id);
    res.status(200).json({
      status: true,
      message: "Material update successful.",
      data: _.pick(role.get(), getMaterialsAttributeList()),
    });
  } catch (error) {
    next(error);
  }
};

exports.getMaterial = async (req, res, next) => {
  try {
    const data = await Materials.findAndCountAll({
      ...queryGenerator({
        query: req.query,
        searchColumns: ["material_name"],
        filterColumns: ["id"],
      }),
      attributes: getMaterialsAttributeList(req.query?.type),
    });

    res.status(200).json({
      status: true,
      message: "Successfully retrieved all material.",
      data,
    });
  } catch (error) {
    next(error);
  }
};
