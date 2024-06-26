import express from "express";
import {
  createProfile,
  deleteUserById,
  getAllUser,
  getUserProfileById,
  searchUserProfile,
  updateProfile,
} from "./controller.js";
import authorizeModule from "../../common/openid/access.js";

const router = express.Router();

// router.post("/", authorizeModule("profile"), createProfile);

router.post("/", createProfile,  authorizeModule('profile'),);

router.get("/:userId", authorizeModule('profile'), getUserProfileById);

router.put("/:userId", updateProfile);

router.delete("/:userId", deleteUserById);

router.get("/",authorizeModule('profile'), getAllUser);

router.get("/profile-search/filter",authorizeModule('profile'), searchUserProfile);

export default router;
