import express from "express";
import {
  createProfile,
  deleteUserById,
  getAllUser,
  getUserProfileById,
  searchUserProfile,
  updateProfile,
} from "./controller.js";

const router = express.Router();

// router.post("/", authorizeModule("profile"), createProfile);

router.post("/", createProfile);

router.get("/:userId", getUserProfileById);

router.put("/:userId", updateProfile);

router.delete("/:userId", deleteUserById);

router.get("/", getAllUser);

router.get("/profile-search/filter", searchUserProfile);

export default router;
