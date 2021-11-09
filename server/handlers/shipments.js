import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

//utility function for sending a response
const sendResponse = ({ res, status, message, data, ...rest }) => {
  res.status(status).json({ status, message, data, ...rest });
};

//function to get all loads
export const getLoads = async (req, res) => {
  const db = req.app.locals.client.db("VanHaul");

  const loads = await db.collection("loads").find().toArray();
  try {
    sendResponse({
      res,
      status: 200,
      data: drivers,
      message: "Loads found",
    });
    console.log(loads);
  } catch (err) {
    sendResponse({ res, status: 500, message: err.message });
  }
};

//function to get a load's details
export const getLoadDetails = async (req, res) => {
  const db = req.app.locals.client.db("VanHaul");
  try {
    const _id = req.params._id;
    const load = await db.collection("loads").findOne({ _id });

    if (!load) {
      sendResponse({
        res,
        status: 400,
        message: "No shipments found",
      });
    } else {
      sendResponse({
        res,
        status: 200,
        data: load,
        message: "Found driver shipments",
      });
    }
  } catch (err) {
    sendResponse({ res, status: 400, message: err.message });
  }
};

//function to get a driver's loads
export const getDriverLoads = async (req, res) => {
  const db = req.app.locals.client.db("VanHaul");
  try {
    const driverId = req.params.driverId;
    const driverLoads = await db
      .collection("loads")
      .find({ driverId })
      .toArray();

    if (!driverLoads) {
      sendResponse({
        res,
        status: 400,
        message: "No shipments found",
      });
    } else {
      sendResponse({
        res,
        status: 200,
        data: driverLoads,
        message: "Found driver shipments",
      });
    }
  } catch (err) {
    sendResponse({ res, status: 400, message: err.message });
  }
};

//function to get a dispatcher's loads
export const getDispatcherLoads = async (req, res) => {
  const db = req.app.locals.client.db("VanHaul");
  try {
    const dispatcherId = req.params.dispatcherId;
    const dispatcherLoads = await db
      .collection("loads")
      .find({ dispatcherId })
      .toArray();

    if (!dispatcherLoads) {
      sendResponse({
        res,
        status: 400,
        message: "No shipments found",
      });
    } else {
      sendResponse({
        res,
        status: 200,
        data: dispatcherLoads,
        message: "Found dispatcher shipments",
      });
    }
  } catch (err) {
    sendResponse({ res, status: 400, message: err.message });
  }
};

//function to get a shipper/receiver's loads
export const getShipperReceiverLoads = async (req, res) => {
  const db = req.app.locals.client.db("VanHaul");
  try {
    const shipperReceiverId = req.params.shipperReceiverId;
    const shipperReceiverLoads = await db
      .collection("loads")
      .find({ shipperReceiverId })
      .toArray();

    if (!shipperReceiverLoads) {
      sendResponse({
        res,
        status: 400,
        message: "No shipments found",
      });
    } else {
      sendResponse({
        res,
        status: 200,
        data: shipperReceiverLoads,
        message: "Found dispatcher shipments",
      });
    }
  } catch (err) {
    sendResponse({ res, status: 400, message: err.message });
  }
};

//function to create a load
export const createLoad = async (req, res) => {
  const db = req.app.locals.client.db("VanHaul");

  try {
    const newLoad = {
      _id: uuidv4(),
      ...req.body,
    };
    const result = await db.collection("loads").insertOne(newLoad);
    sendResponse({
      res,
      status: 200,
      data: newLoad,
      message: "Shipment Created",
    });
  } catch (err) {
    sendResponse({ res, status: 500, message: err.message });
  }
};

export default router;
