import express from "express";
import user from "./auth/index.js"
import swagger from "../common/swagger/index.js";

const router = express.Router();

router.use("/users", user);

router.use("/api-docs", swagger);

export default router;