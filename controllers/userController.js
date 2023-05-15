const User = require("../models/User");
const Thought = require("../models/Thought")

module.exports = {
	getUsers(req, res) {
		User.find()
			.then((users) => res.json(users))
			.catch((err) => res.status(500).json(err));
	},
	getSingleUser(req, res) {
		User.findOne({ _id: req.params._id })
			.select("-__v")
			.populate("thought")
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
		User.findOneAndUpdate({ _id: req.params._id },
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

	deleteUser(req, res) {
		User.findOneAndDelete({ _id: req.params._id })
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


	async deleteFriend(req, res) {
		try {
			const frienddata = await User.findOneAndDelete({ _id: req.params.userId })
			if (!frienddata) {
				return res.status(404).json({ message: "No friend with that ID!" })
			}
			const userdata = User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { friends: req.params.friendId } }, { new: true })
			if (!userdata) {
				return res.status(404).json({ message: "No User find with this ID!" })
			}
			res.json({ message: " successfully deleted" })
		}

		catch (err) { res.status(500).json(err) };
	},
};
