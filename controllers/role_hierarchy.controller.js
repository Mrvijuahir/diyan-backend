const {
  getRoleHierarchyAttributeList,
  getRolesAttributeList,
} = require("../constants");
const { queryGenerator } = require("../helpers");
const { RoleHierarchy, Roles } = require("../models");
const _ = require("lodash");
const { Op } = require("sequelize");

exports.create = async (req, res, next) => {
  try {
    const { role_id, reporting_to } = req.body;
    if (role_id === reporting_to)
      return res.status(400).json({
        status: false,
        message: "Same role and reporting role is not allowed.",
      });
    const isExist = await RoleHierarchy.count({
      where: _.omit(req.body, ["status"]),
    });
    if (isExist)
      return res.status(422).json({
        status: false,
        message: "Role hierarchy already created.",
      });
    let roleHierarchy = await RoleHierarchy.create(req.body);
    await roleHierarchy.reload({
      attributes: getRoleHierarchyAttributeList(),
      include: [
        {
          model: Roles,
          as: "role",
          attributes: getRolesAttributeList("dropdown"),
        },
        {
          model: Roles,
          as: "reporting_role",
          attributes: getRolesAttributeList("dropdown"),
        },
      ],
    });
    res.status(200).json({
      status: true,
      message: "Role hierarchy created successfully.",
      data: roleHierarchy,
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { reporting_to } = req.body;
    let data = await RoleHierarchy.findByPk(id);
    if (reporting_to) {
      const isExist = await RoleHierarchy.count({
        where: {
          role_id: data?.get()?.id,
          reporting_to,
          id: {
            [Op.ne]: id,
          },
        },
      });
      if (isExist)
        return res.status(422).json({
          status: false,
          message: "Role hierarchy already created.",
        });
    }
    const isUpdate = await RoleHierarchy.update(req.body, {
      where: {
        id,
      },
    });
    if (!isUpdate)
      return res.status(422).json({
        status: false,
        message: "Something went wrong! Role hierarchy not updated.",
      });
    data = await RoleHierarchy.findByPk(id, {
      attributes: getRoleHierarchyAttributeList(),
      include: [
        {
          model: Roles,
          as: "role",
          attributes: getRolesAttributeList("dropdown"),
        },
        {
          model: Roles,
          as: "reporting_role",
          attributes: getRolesAttributeList("dropdown"),
        },
      ],
    });
    res.status(200).json({
      status: true,
      message: "Role hierarchy updated successfully.",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getRoleHierarchy = async (req, res, next) => {
  try {
    const data = await RoleHierarchy.findAndCountAll({
      ...queryGenerator({
        query: req.query,
        searchColumns: ["$role.role_name$", "$reporting_role.role_name$"],
        filterColumns: ["id"],
      }),
      attributes: getRoleHierarchyAttributeList(),
      include: [
        {
          model: Roles,
          as: "role",
          attributes: getRolesAttributeList("dropdown"),
        },
        {
          model: Roles,
          as: "reporting_role",
          attributes: getRolesAttributeList("dropdown"),
        },
      ],
    });

    res.status(200).json({
      status: true,
      message: "Successfully retrieved all role hierarchy.",
      data,
    });
  } catch (error) {
    next(error);
  }
};
