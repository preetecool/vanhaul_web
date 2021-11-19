import express from "express";

import {
	createLoad,
	getLoads,
	getLoadDetails,
	getDriverLoads,
	getDispatcherLoads,
	getShipperReceiverLoads,
	deleteLoad,
} from "../handlers/shipments.js";

const router = express.Router();

//shipment endpoints
router.get("/loads", getLoads);
router.get("/loads/:_id", getLoadDetails);
router.post("/loads", createLoad);
router.get("/driverloads/:driverId", getDriverLoads);
router.get("/dispatchedloads/:dispatcherId", getDispatcherLoads);
router.get("/srloads/:shipperReceiverId", getShipperReceiverLoads);
router.delete("/loads/:_id", deleteLoad);

export default router;
