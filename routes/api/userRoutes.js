const router = require("express").Router();
const {
	getUser,
	getSingleUser,
	createUser,
	deleteUser,
} = require("../../controllers/userController");

router.route("/").get(getUser).post(createUser);

// /api/courses/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);



//POST/delete friend by id
router
	.route("/:userId/friendss/:friendId")
	.post(addFriend)
	.delete(deleteFriend);

module.exports = router;
