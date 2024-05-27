import express from "express";
import {
  createProfile,
  deleteUserById,
  getAllUser,
  getUserProfileById,
  updateProfile,
} from "./controller.js";
import authorizeModule from "../../common/openid/access.js";

const router = express.Router();

// router.post("/", authorizeModule("profile"), createProfile);

router.post("/", createProfile);

router.get("/:userId", getUserProfileById);

router.put("/:userId", updateProfile);

router.delete("/:userId", deleteUserById);

router.get("/", getAllUser);

export default router;
