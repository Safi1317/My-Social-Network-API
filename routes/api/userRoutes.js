const router = require("express").Router();
const {
	getUsers,
	getSingleUser,
	createUser,
	updateUser,
	addFriend,
	deleteFriend,

	deleteUser,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);

// /api/courses/:userId
router.route("/:_id").get(getSingleUser).put(updateUser).delete(deleteUser);

//POST/delete friend by id
router
	.route("/:userId/friends/:friendId")
	.post(addFriend)
	.delete(deleteFriend);

module.exports = router;
