const { Thought, User } = require("../../models");

module.exports = {
	getthoughts(req, res) {
		Thought.find()
			.then((thoughts) => res.json(thoughts))
			.catch((err) => res.status(500).json(err));
	},
	getSinglethoughts(req, res) {
		Thought.findOne({ _id: req.params.thoughtId })
			.then((thought) =>
				!thought
					? res.status(404).json({ message: "No post with that ID" })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
	// create a new post
	createthoughts(req, res) {
		Thought.create(req.body)
			.then((thought) => {
				return User.findOneAndUpdate(
					{ _id: req.body.userId },
					{ $addToSet: { thoughts: thought._id } },
					{ new: true }
				);
			})
			.then((user) =>
				!user
					? res
							.status(404)
							.json({ message: "Post created, but found no user with that ID" })
					: res.json("Created the post 🎉")
			)
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},
};
