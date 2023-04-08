const { Roles, Users } = require("../models");
const { Op } = require("sequelize");

exports.addRole = async (req, res, next) => {
	try {
		const { role_name } = req.body;
		const isRoleExist = await Roles.findOne({
			where: {
				role_name,
			},
		});
		if (isRoleExist) {
			return res.status(409).json({
				status: false,
				message: "Role already Exists",
			});
		} else {
			let addNewRole = await Roles.create(req.body);
			addNewRole = addNewRole.get();
			res.status(200).json({
				status: true,
				message: "Signup successful.",
				data: addNewRole,
			});
		}
	} catch (error) {
		next(error);
	}
};

exports.getRole = async (req, res, next) => {
	try {
		const {
			query: { role_name, status },
		} = req;

		const where = {
			[Op.or]: [
				{
					role_name: {
						[Op.eq]: role_name,
					},
				},
				{
					status: {
						[Op.eq]: status,
					},
				},
			],
		};
		let role = await Roles.findAll({ where });

		res.status(200).json({
			status: true,
			message: "Successful.",
			data: role,
		});
	} catch (error) {
		next(error);
	}
};

exports.getRoleById = async (req, res, next) => {
	try {
		const {
			params: { id },
		} = req;
		let role = await Roles.findOne({
			where: { id },
		});
		if (role) {
			role = role.get();
			res.status(200).json({
				status: true,
				message: "Successfull.",
				data: role,
			});
		} else {
			res.status(404).json({
				status: false,
				message: "Record not available",
			});
		}
	} catch (error) {
		next(error);
	}
};

exports.updateRole = async (req, res, next) => {
	try {
		const {
			params: { id },
		} = req;
		await Roles.update(req.body, {
			where: {
				id: id,
			},
		});
		const updateValue = await Roles.findOne({
			where: {
				id: id,
			},
		});
		res.status(200).json({
			status: true,
			message: "Update successful.",
			data: updateValue.get(),
		});
	} catch (error) {
		next(error);
	}
};

exports.deleteRole = async (req, res, next) => {
	try {
		const {
			params: { id },
		} = req;
		await Roles.destroy({
			where: { id },
		});
		res.status(200).json({
			status: true,
			message: "Delete successful.",
		});
	} catch (error) {
		next(error);
	}
};
