// const { ObjectId } = require("bson");
const { Schema, Types } = require("mongoose");

// Construct a new instance of the schema class
const reactionSchema = new Schema({
	// Configure individual properties using Schema Types
	reactionId: {
		type: Schema.Types.ObjectId,
		default: () => new Types.ObjectId(),
	},
	reactionBody: { type: String, required: true, maxlength: 280 },
	username: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});
// const User = model("reaction", reactionSchema);

module.exports = reactionSchema;
b