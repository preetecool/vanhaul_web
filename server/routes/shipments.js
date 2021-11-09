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
shipmentRouter.get("/loads", getLoads);
shipmentRouter.get("/loads/:_id", getLoadDetails);
shipmentRouter.post("loads", createLoad);
shipmentRouter.get("/driverloads/:driverId", getDriverLoads);
shipmentRouter.get("/dispatchedloads/:dispatcherId", getDispatcherLoads);
shipmentRouter.get("/srloads/:shipperReceiverId", getShipperReceiverLoads);

export default shipmentRouter;
