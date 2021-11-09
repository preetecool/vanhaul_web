import express from "express";

import {
  getDrivers,
  getShipperReceiver,
  createUser,
  addUserRole,
  findAllUsers,
  findAUser,
} from "../handlers/users.js";

const userRouter = express.Router();

//users endpoints
userRouter.get("/users/:email", findAUser);
userRouter.get("/users", findAllUsers);
userRouter.post("/users", createUser);
userRouter.post("/users/:email", createUser);
userRouter.patch("/users", addUserRole);
userRouter.get("/drivers", getDrivers);
userRouter.get("/shipper-receiver", getShipperReceiver);

export default userRouter;
