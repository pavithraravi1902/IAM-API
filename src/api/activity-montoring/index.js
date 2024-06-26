import express from "express";
import { fetchLogs, logRequest } from "./controller.js";

const router = express.Router();

router.get("/fetch", fetchLogs);

router.get("/", logRequest);

export default router;
