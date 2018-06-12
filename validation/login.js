const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : "";
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";
	data.password2 = !isEmpty(data.password2) ? data.password2 : "";

	if (Validator.isEmpty(data.email)) {
		errors.email = "Email field is required";
	}

	if (!Validator.isEmail(data.email)) {
		errors.email = "Provided email is invalid";
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = "Password is required";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
