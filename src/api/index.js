import express from "express";
import user from "./auth/index.js"
import document from "./file-upload/index.js"
import swagger from "../common/swagger/index.js";

const router = express.Router();

router.use("/users", user);

router.use("/document", document);

router.use("/api-docs", swagger);

export default router;