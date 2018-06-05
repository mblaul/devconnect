const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema

const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	avater: {
		type: String
	},
	date: {
		type: String,
		default: Date.now
	}
});

module.exports = User = mongoose.model("users", UserSchema);
