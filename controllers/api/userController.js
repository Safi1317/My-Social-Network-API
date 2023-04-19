const User = require("../../models/User");

module.exports = {
	getUsers(req, res) {
		User.find()
			.then((users) => res.json(users))
			.catch((err) => res.status(500).json(err));
	},
	getSingleUser(req, res) {
		User.findOne({ _id: req.params.userId })
			.select("-__v")
			.populate("thoughts")
			.then((user) =>
				!user
					? res.status(404).json({ message: "No user with that ID" })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
	// create a new user
	createUser(req, res) {
		User.create(req.body)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.status(500).json(err));
	},
	//update a user
	updateUser(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
			.then((user) =>
				!user
					? res.status(404).json({ message: "No User find with this ID!" })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
	//delete a user
	//BONUS: Remove a user's associated thoughts when deleted.
	deleteUser(req, res) {
		User.findOneAndDelete({ _id: req.params.userId })
			.then((user) =>
				!user
					? res.status(404).json({ message: "No User find with this ID!" })
					: Thought.deleteMany({ _id: { $in: user.thoughts } })
			)
			.then(() => res.json({ message: "User and Thought deleted!" }))
			.catch((err) => res.status(500).json(err));
	},
	//add a friend
	addFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $addToSet: { friends: req.params.friendId } },
			{ runValidators: true, new: true }
		)
			.then((user) =>
				!user
					? res.status(404).json({ message: "No User find with this ID!" })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
	//delete a friend
	deleteFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $pull: { friends: req.params.friendId } },
			{ new: true }
		)
			.then((user) =>
				!user
					? res.status(404).json({ message: "No User find with this ID!" })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
};
