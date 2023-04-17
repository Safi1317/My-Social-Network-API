const express = require("express");
const db = require("./config/connection");

const {} = require("./models");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get("/", (req, res) => {
// Using model in route
// 	Thought.find({}, (err, result) => {
// 		if (err) {
// 			res.status(500).send(err);
// 		} else {
// 			res.status(200).json(result);
// 		}
// 	});
// });

db.once("open", () => {
	app.listen(PORT, () => {
		console.log(`API server running on port ${PORT}!`);
	});
});
