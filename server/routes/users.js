import express from "express";

import {
  getDrivers,
  getShipperReceiver,
  createUser,
  addUserRole,
  findAllUsers,
  findAUser,
} from "../handlers/users.js";

const router = express.Router();

//users endpoints
router.get("/users/:email", findAUser);
router.get("/users", findAllUsers);
router.post("/users", createUser);
router.post("/users/:email", createUser);
router.patch("/users", addUserRole);
router.get("/drivers", getDrivers);
router.get("/shipper-receiver", getShipperReceiver);

export default userRouter;
