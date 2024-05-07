import express from "express";
import { createProfile, updateProfile } from "./controller.js";

const router = express.Router();

router.post("/", createProfile);

router.put("/", updateProfile);

export default router;