const {
  getRoleHierarchyAttributeList,
  getRolesAttributeList,
} = require("../constants");
const { queryGenerator } = require("../helpers");
const { RoleHierarchy, Roles } = require("../models");
const _ = require("lodash");

exports.create = async (req, res, next) => {
  try {
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
    const data = await RoleHierarchy.findByPk(id, {
      attributes: getRoleHierarchyAttributeList(),
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
        searchColumns: ["", "created_at"],
        ...(req.query?.status && {
          where: {
            status: req.query?.status === "true",
          },
        }),
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
