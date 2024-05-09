import express from "express";
import { createProfile, updateProfile } from "./controller.js";

const router = express.Router();

router.post("/", authorizeModule('profile'), createProfile);

router.put("/", authorizeModule('profile'), updateProfile);

export default router;