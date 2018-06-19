const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");
const User = require("../../models/User");

//Validate post input
const validatePostInput = require("../../validation/post");

// @route   GET api/posts/test
// @desc    Test post route
// @access  Public
router.get("/test", (req, res) => {
	res.json({ message: "Test comprete!" });
});

// @route   GET api/posts/
// @desc    Get all posts
// @access  Public
router.get("/", (req, res) => {
	Post.find()
		.sort({ date: -1 })
		.then(posts => res.json(posts))
		.catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});

// @route   GET api/posts/:post_id
// @desc    Get all posts
// @access  Public
router.get("/:post_id", (req, res) => {
	Post.findById(req.params.post_id)
		.then(post => res.json(post))
		.catch(err =>
			res.status(404).json({ nopostfound: "No post was found with that ID" })
		);
});

// @route   POST api/posts/
// @desc    Create post
// @access  Private
router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);

		//Check validation
		if (!isValid) {
			return res.status(400).json(errors);
		}

		const newPost = new Post({
			text: req.body.text,
			name: req.body.name,
			avatar: req.body.name,
			user: req.user.id
		});

		newPost.save().then(post => res.json(post));
	}
);

// @route   DELETE api/posts/:post_id
// @desc    Delete post
// @access  Private
router.delete(
	"/:post_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const errors = {};

		//Check validation
		if (req.params.post_id === null) {
			errors.nopost = "No post was given";
			return res.status(400).json(errors);
		}

		Post.findOneAndRemove({ _id: req.params.post_id, user: req.user.id })
			.then(() => {
				res.json({ message: "Post has been deleted." });
			})
			.catch(err =>
				res.status(400).json({ nopost: "There was problem deleting that post" })
			);
	}
);

// @route   POST api/posts/like/:post_id
// @desc    Like a post
// @access  Private
router.post(
	"/like/:post_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const errors = {};

		//Check validation
		if (!req.params.post_id) {
			errors.nopost = "No post was given";
			return res.status(400).json(errors);
		}

		Post.findById(req.params.post_id).then(post => {
			if (
				post.likes.filter(like => like.user.toString() === req.user.id).length >
				0
			) {
				return res
					.status(400)
					.json({ alreadyliked: "User already liked this post" });
			}

			//Add user ID to likes array
			post.likes.unshift({ user: req.user.id });
			post.save().then(post => res.json(post));
		});
	}
);

// @route   POST api/posts/like/:post_id
// @desc    Unlike a post
// @access  Private
router.post(
	"/unlike/:post_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const errors = {};

		//Check validation
		if (!req.params.post_id) {
			errors.nopost = "No post was given";
			return res.status(400).json(errors);
		}

		Post.findById(req.params.post_id)
			.then(post => {
				if (
					post.likes.filter(like => like.user.toString() === req.user.id)
						.length == 0
				) {
					return res
						.status(400)
						.json({ notliked: "You have not yet liked this post" });
				}

				//Remove user from like array
				const removeIndex = post.likes
					.map(item => item.user.toString())
					.indexOf(req.user.id);

				post.likes.splice(removeIndex, 1);
				post.save().then(post => res.json(post));
			})
			.catch(err => {
				res.status(404).json({ postnotfound: "No post found" });
			});
	}
);

// @route   POST api/posts/like/:post_id
// @desc	Comment on a post
// @access  Private
router.post(
	"/comment/:post_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);
		//Check validation
		if (!isValid) {
			return res.status(400).json(errors);
		}

		Post.findById(req.params.post_id)
			.then(post => {
				const newComment = {
					text: req.body.text,
					name: req.body.name,
					avatar: req.body.avatar,
					user: req.user.id
				};

				//Add to comments array
				post.comments.unshift(newComment);
				post.save().then(post => res.json(post));
			})
			.catch(err => res.status(404).json({ postnotfound: "No post found" }));
	}
);

// @route   POST api/posts/like/:post_id/:comment_id
// @desc    Delete a post comment
// @access  Private
router.delete(
	"/comment/:post_id/:comment_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Post.findById(req.params.post_id)
			.then(post => {
				//Check to see if comment exists and if provided user posted it
				const commentIndex = post.comments.findIndex(
					comment =>
						comment.user.toString() === req.user.id &&
						comment._id.toString() === req.params.comment_id
				);
				if (commentIndex === -1) {
					return res.status(401).json({
						notauthorized: "You are not authorized to delete this comment."
					});
				}
				post.comments.splice(commentIndex, 1);
				post.save().then(post => res.json(post));
			})
			.catch(err =>
				res.status(404).json({ postnotfound: "No post found" + err })
			);
	}
);

module.exports = router;
