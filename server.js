const express = require("express");
const mongoose = require("mongoose");
const app = express();

//DB config
const db = require("./config/keys").mongoURI;

mongoose
	.connect(db)
	.then(() => console.log("MongoDB connected!"))
	.catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello world"));

//Set port to environment port or 5000
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
