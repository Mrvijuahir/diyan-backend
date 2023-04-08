const { Roles } = require("../models");

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
		const { id } = req.body;
		const where = {};
		where.id = id;
		let role = await Roles.findAll(where);
		res.status(200).json({
			status: true,
			message: "Successful.",
			data: role,
		});
	} catch (error) {
		next(error);
	}
};
