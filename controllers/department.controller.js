const { Departments, MaterialsDepartments, Materials } = require("../models");
const {
  getDepartmentsAttributeList,
  getMaterialsAttributeList,
} = require("../constants");
const _ = require("lodash");
const { Op } = require("sequelize");
const { queryGenerator } = require("../helpers");

exports.addDepartments = async (req, res, next) => {
  try {
    const { department_name } = req.body;
    const isDepartmentExist = await Departments.count({
      where: {
        department_name,
      },
    });
    if (isDepartmentExist)
      return res.status(422).json({
        status: false,
        message: "Department already Exists",
      });
    let department = await Departments.create(_.omit(req.body, ["material"]));
    if (!department)
      return res.status(422).json({
        status: false,
        message: "Department Not Created",
      });
    if (req.body.material.length > 0) {
      await MaterialsDepartments.bulkCreate(
        req.body.material.map((item) => {
          return {
            material_id: item,
            department_id: department.getDataValue("id"),
          };
        })
      );
    }
    await department.reload({
      attributes: getDepartmentsAttributeList(),
      include: [
        {
          model: Materials,
          attributes: getMaterialsAttributeList("dropdown"),
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.status(201).json({
      status: true,
      message: "Department added successful.",
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { department_name } = req.body;
    if (department_name) {
      const isDepartmentExist = await Departments.count({
        where: {
          department_name,
          id: {
            [Op.ne]: id,
          },
        },
      });
      if (isDepartmentExist)
        return res.status(422).json({
          status: false,
          message: "Department already Exists",
        });
    }
    let isUpdate = await Departments.update(_.omit(req.body, ["material"]), {
      where: { id },
    });
    if (!isUpdate[0]) {
      return res.status(422).json({
        status: false,
        message: "Department not Updated",
      });
    }
    await MaterialsDepartments.destroy({
      where: {
        department_id: id,
        material_id: {
          [Op.notIn]: req.body.material,
        },
      },
    });
    await MaterialsDepartments.bulkCreate(
      req.body.material.map((item) => {
        return {
          material_id: item,
          department_id: id,
        };
      }),
      { ignoreDuplicates: true }
    );
    const data = await Departments.findByPk(id, {
      attributes: getDepartmentsAttributeList(),
      include: [
        {
          model: Materials,
          attributes: getMaterialsAttributeList("dropdown"),
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.status(201).json({
      status: true,
      message: "Department Updated successful.",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getDepartments = async (req, res, next) => {
  try {
    const department = await Departments.findAndCountAll({
      ...queryGenerator({
        query: req.query,
        searchColumns: ["department_name"],
        filterColumns: ["id"],
      }),
      attributes: getDepartmentsAttributeList(),
      include: [
        {
          model: Materials,
          attributes: getMaterialsAttributeList("dropdown"),
          through: {
            attributes: [],
          },
        },
      ],
      distinct: true,
    });
    res.status(200).json({
      status: true,
      message: "Successfully retrieved all Department.",
      data: department,
    });
  } catch (error) {
    next(error);
  }
};
