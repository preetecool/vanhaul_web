import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

require("dotenv").config();
const { MongoClient } = require("mongodb");
