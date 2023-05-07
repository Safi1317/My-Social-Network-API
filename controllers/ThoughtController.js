const { Thought } = require("../models");
const User = require("../models/User");

module.exports = {
	getThoughts(req, res) {
		Thought.find({})
			.then((thought) => res.json(thought))
			.catch((err) => res.status(500).json(err));
	},
	getSingleThought(req, res) {
		Thought.findOne({ _id: req.params.thoughtId })
			.then((thought) => (!thought ? res.status(404).json({ message: "No post with that ID" }) : res.json(thought)))
			.catch((err) => res.status(500).json(err));
	},
	// create a new post
	createThought(req, res) {
		Thought.create(req.body)
			.then((thought) => {
				return User.findOneAndUpdate({ _id: req.body.userId }, { $addToSet: { thoughts: thought._id } }, { new: true });
			})
			.then((user) => (!user ? res.status(404).json({ message: "Post created, but found no user with that ID" }) : res.json("Created the post 🎉")))
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// Update a thought
	updateThought(req, res) {
		Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, New: true })
			.then((user) => (!user ? res.status(404).json({ message: "No thought find with this ID!" }) : res.json(user)))
			.catch((err) => res.status(500).json(err));
	},

	// Delete a thought
	deleteThought(req, res) {
		Thought.findOneAndDelete({ _id: req.params.thoughtId })
			.then((thought) => (!thought ? res.status(404).json({ message: "No thought with that ID" }) : User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } }, { new: true })))
			.then((user) => (!user ? res.status(404).json({ message: "Thought deleted, but no user found" }) : res.json({ message: "Thought successfully deleted" })))
			.catch((err) => res.status(500).json(err));
	},

	//create reaction
	createReaction(req, res) {
		Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true })
			.then((thought) => (!thought ? res.status(404).json({ message: "No thought frind with ID!" }) : res.json(thought)))
			.catch((err) => res.status(500).json(err));
	},
	//delete reaction
	deleteReaction(req, res) {
		console.log(req.params.reactionId);

		Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { runValidators: true, new: true })
			.then((thought) => (!thought ? res.status(404).json({ message: "No thought find with this ID!" }) : res.json(thought)))
			.catch((err) => res.status(500).json(err));
	},
};
