import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

import shipmentRouter from "./routes/shipments.js";
import userRouter from "./routes/users.js";

const app = express();
dotenv.config();

//cors request
app.use(cors());

const MONGO_URI = process.env.MONGO_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use("/api", shipmentRouter);
app.use("/api", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome to VanHaul");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Catch all endpoint
app.use("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});

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
