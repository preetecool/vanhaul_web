import express from "express";

import {
  createLoad,
  getLoads,
  getLoadDetails,
  getDriverLoads,
  getDispatcherLoads,
  getShipperReceiverLoads,
} from "../handlers/shipments.js";

const shipmentRouter = express.Router();

//shipment endpoints
router.get("/loads", getLoads);
router.get("/loads/:_id", getLoadDetails);
router.post("loads", createLoad);
router.get("/driverloads/:driverId", getDriverLoads);
router.get("/dispatchedloads/:dispatcherId", getDispatcherLoads);
router.get("/srloads/:shipperReceiverId", getShipperReceiverLoads);

export default shipmentRouter;
