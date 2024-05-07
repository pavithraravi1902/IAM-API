import express from "express";
import multer from "multer";
import { downloadFile, uploadFile } from "./controller.js";
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/", upload.single("file"), uploadFile);

router.get("/", downloadFile);

export default router;
