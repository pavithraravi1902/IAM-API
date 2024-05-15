import express from "express";
import multer from "multer";
import { downloadFile, uploadFile } from "./controller.js";
import upload from "../../common/multer/multer.js";

const router = express.Router();

router.post("/", upload.single("file"), uploadFile);

router.get("/:fileKey", downloadFile);

export default router;
