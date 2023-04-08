const { getRolesAttributeList } = require("../constants");
const { queryGenerator } = require("../helpers");
const { Roles, RoleHierarchy } = require("../models");
const _ = require("lodash");
const { Op } = require("sequelize");

exports.addRole = async (req, res, next) => {
  try {
    const { role_name } = req.body;
    const isRoleExist = await Roles.count({
      where: {
        role_name,
      },
    });
    if (isRoleExist)
      return res.status(409).json({
        status: false,
        message: "Role already Exists",
      });
    let role = await Roles.create(req.body);
    role = role.get();
    res.status(200).json({
      status: true,
      message: "Role created successfully.",
      data: _.pick(role, getRolesAttributeList()),
    });
  } catch (error) {
    next(error);
  }
};

exports.updateRole = async (req, res, next) => {
  try {
    const id = req.params.id;
    const isUpdate = await Roles.update(req.body, {
      where: {
        id,
      },
    });
    if (!isUpdate)
      return res.status(422).json({
        status: false,
        message: "Something went wrong! Role not updated.",
      });
    const role = await Roles.findByPk(id);
    res.status(200).json({
      status: true,
      message: "Update successful.",
      data: _.pick(role.get(), getRolesAttributeList()),
    });
  } catch (error) {
    next(error);
  }
};

exports.getRoles = async (req, res, next) => {
  try {
    const data = await Roles.findAndCountAll({
      ...queryGenerator({
        query: req.query,
        searchColumns: ["role_name"],
        filterColumns: ["id"],
      }),
      attributes: getRolesAttributeList(req.query?.type),
    });

    res.status(200).json({
      status: true,
      message: "Successfully retrieved all roles.",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getRolesForHierarchy = async (req, res, next) => {
  try {
    const data = await Roles.findAndCountAll({
      ...queryGenerator({
        query: req.query,
      }),
      where: {
        "$role_hierarchy.id$": {
          [Op.eq]: null,
        },
      },
      attributes: getRolesAttributeList("dropdown"),
      include: [
        {
          model: RoleHierarchy,
          as: "role_hierarchy",
        },
      ],
    });
    res.status(200).json({
      status: true,
      message: "Successfully retrieved all roles.",
      data,
    });
  } catch (error) {
    next(error);
  }
};
