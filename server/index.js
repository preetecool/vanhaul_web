import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

import shipmentRoutes from "./routes/shipments.js";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

//cores request
app.use(cors());
app.options("*", cors());

app.use("/api", shipmentRoutes);
app.use("/api", userRoutes);

app.get("/", (req, res) => {
	res.send("Welcome to VanHaul");
});

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { MONGO_URI } = process.env;
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build"));
});

//Catch all endpoint
// app.use("*", (req, res) => {
// 	res.status(404).json({
// 		status: 404,
// 		message: "This is obviously not what you are looking for.",
// 	});
// });

//Setup fuction so we don't need to declare mongodb variables everytime.
const setup = async () => {
	const client = new MongoClient(MONGO_URI, options);
	await client.connect();

	app.locals.client = client;

	const server = app.listen(process.env.PORT || 8000, function () {
		console.info("🌍 Listening on port " + server.address().port);
	});
};

setup();
