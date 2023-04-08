const { getMaterialsAttributeList } = require("../constants");
const { queryGenerator } = require("../helpers");
const { Materials } = require("../models");

exports.addMaterial = async (req, res, next) => {
	try {
		const { material_name } = req.body;
		const isMaterialExist = await Materials.count({
			where: {
				material_name,
			},
		});
		if (isMaterialExist)
			return res.status(409).json({
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
		const isUpdate = await Materials.update(req.body, {
			where: {
				id,
			},
		});
		if (!isUpdate)
			return res.status(422).json({
				status: false,
				message: "Something went wrong! Role not updated.",
			});
		const role = await Materials.findByPk(id);
		res.status(200).json({
			status: true,
			message: "Update successful.",
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
			message: "Successfully retrieved all roles.",
			data,
		});
	} catch (error) {
		next(error);
	}
};
