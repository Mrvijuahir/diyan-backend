const { Employees } = require("../models");

exports.create = async (req, res, next) => {
  try {
    const employee = await Employees.create(req.body);
    if (!employee)
      return res.status(422).json({
        status: false,
        message: "Something went wrong! Employee not added.",
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
    const employee = await Employees.findByPk(req.params?.id);
    res.status(200).json({
      status: true,
      message: "Successfully updated employee detail.",
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const isDelete = await Employees.destroy({
      where: {
        id: req.params?.id,
      },
    });
    if (!isDelete)
      return res.status(422).json({
        status: false,
        message: "Something went wrong! Employee detail not deleted.",
      });
    res.status(200).json({
      status: true,
      message: "Successfully deleted employee detail.",
      data: {
        id: req.params.id,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getEmployees = async (req, res, next) => {
  try {
    const employees = await Employees.findAll({});
    res.status(200).json({
      status: true,
      message: "Successfully retrieved all employees.",
      data: employees,
    });
  } catch (error) {
    next(error);
  }
};

exports.getEmployee = async (req, res, next) => {
  try {
    const employee = await Employees.findByPk(req.params.id);
    if (!employee)
      return res.status(404).json({
        status: false,
        message: "Employee not found!",
      });
    res.status(200).json({
      status: true,
      message: "Successfully retrieved employee detail.",
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};
