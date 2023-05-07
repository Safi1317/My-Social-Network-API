// Require schema and model from mongoose
const mongoose = require("mongoose");
const reactionSchema = require("./Reaction");
// const { timestamp } = require("utils");


const thoughtsSchema = new mongoose.Schema({
	
	thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
	username: { type: String, required: true },
	createdAt: {
		type: Date,
		default: Date.now,
		// get: (timestamp) => dateFormat(timestamp),
	},
	reactions: [reactionSchema],
});
thoughtsSchema.virtual("reactionCount").get(function () {
	return this.reactions.length;
});

const Thought = mongoose.model("Thought", thoughtsSchema);

module.exports = Thought;
