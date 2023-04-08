const { Op } = require("sequelize");
const { Employees, Roles } = require("../models");
const { queryGenerator } = require("../helpers");
const {
  getEmployeeAttributeList,
  getRolesAttributeList,
} = require("../constants");

exports.create = async (req, res, next) => {
  try {
    const isExist = await Employees.count({
      where: {
        email: req.body?.email,
      },
    });
    if (isExist)
      return res.status(422).json({
        status: false,
        message: "Email already in use.",
      });
    let employee = await Employees.create(req.body);
    if (!employee)
      return res.status(422).json({
        status: false,
        message: "Something went wrong! Employee not added.",
      });
    await employee.reload({
      attributes: getEmployeeAttributeList(),
      include: [
        {
          model: Roles,
          attributes: getRolesAttributeList("dropdown"),
        },
        {
          model: Employees,
          as: "reporting_employee",
          attributes: getEmployeeAttributeList("dropdown"),
        },
      ],
    });
    res.status(201).json({
      status: true,
      message: "Employee added successful.",
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    if (req.body?.email) {
      const isExist = await Employees.count({
        where: {
          email: req.body?.email,
          id: {
            [Op.ne]: req.params.id,
          },
        },
      });
      if (isExist)
        return res.status(422).json({
          status: false,
          message: "Email already in use.",
        });
    }
    const isUpdate = await Employees.update(req.body, {
      where: {
        id: req.params?.id,
      },
    });
    if (!isUpdate[0])
      return res.status(422).json({
        status: false,
        message: "Something went wrong! Employee details not updated.",
      });
    const employee = await Employees.findByPk(req.params?.id, {
      attributes: getEmployeeAttributeList(),
      include: [
        {
          model: Roles,
          attributes: getRolesAttributeList("dropdown"),
        },
        {
          model: Employees,
          as: "reporting_employee",
          attributes: getEmployeeAttributeList("dropdown"),
        },
      ],
    });
    res.status(200).json({
      status: true,
      message: "Successfully updated employee detail.",
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

exports.getEmployees = async (req, res, next) => {
  try {
    const employees = await Employees.findAndCountAll({
      ...queryGenerator({
        query: req.query,
        searchColumns: ["name", "email"],
        filterColumns: ["id"],
      }),
      attributes: getEmployeeAttributeList(),
      include: [
        {
          model: Roles,
          attributes: getRolesAttributeList("dropdown"),
          required: false,
        },
        {
          model: Employees,
          as: "reporting_employee",
          attributes: getEmployeeAttributeList("dropdown"),
          required: false,
        },
      ],
    });
    res.status(200).json({
      status: true,
      message: "Successfully retrieved all employees.",
      data: employees,
    });
  } catch (error) {
    next(error);
  }
};

exports.getRoleWiseEmployees = async (req, res, next) => {
  try {
    const data = await Roles.findAndCountAll({
      ...queryGenerator({
        query: req.query,
        where: {
          id: req.query?.role_id,
        },
      }),
      attributes: getRolesAttributeList("dropdown"),
      include: [
        {
          model: Employees,
          attributes: getEmployeeAttributeList("dropdown"),
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
