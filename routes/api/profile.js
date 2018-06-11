const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Models
const Profile = require("../../models/Profle");
const User = require("../../models/User");

// @route   GET api/profile/test
// @desc    Test profiles route
// @access  Public
router.get("/test", (req, res) => {
	res.json({ message: "Test comprete!" });
});

// @route   GET api/profile/
// @desc    Check current user's porfile
// @access  Private
router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const errors = {};

		Profile.findOne({ user: req.user.id })
			.then(profile => {
				console.log("in here!");
				console.log(profile);
				if (!profile) {
					console.log("in here2!");
					errors.noprofile = "There is no profile for this user";
					return res.status(404).json(errors);
				}
				res.json(profile);
			})
			.catch(err => res.status(404).json(err));
	}
);

module.exports = router;
