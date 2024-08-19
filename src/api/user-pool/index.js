import express from "express";
import { createUserPool, getUserPoolByUserId, listUsersFromUserPool, updateUserDetailsByUserId } from "./controller.js";

const router = express.Router();

router.post("/", createUserPool);

router.get("/:poolId/users/:userId", getUserPoolByUserId);

router.get("/:poolId", listUsersFromUserPool);

router.put("/:poolId/users/:userId", updateUserDetailsByUserId);

export default router;