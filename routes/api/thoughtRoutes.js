const router = require("express").Router();
const {
	getThought,
	getSingleThought,
	createThought,
	updateThought,
	deleteThought,
	createReaction,
	deleteReaction,
} = require("../../controllers/ThoughtController.js");

// /api/courses
router.route("/").get(getThought).post(createThought);

// /api/courses/:courseId
router
	.route("/:thoughtId")
	.get(getSingleThought)
	.put(updateThought)
	.delete(deleteThought);

router.route("/:thoughtId/reactions").post(createReaction);

//delete reaction by id
router.route("/:thoughtId/reactions/:reactionId").post(deleteReaction);

module.exports = router;
