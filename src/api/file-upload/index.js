import express from "express";
import multer from "multer";
import {
  downloadFile,
  localDownload,
  localUpload,
  uploadFile,
} from "./controller.js";
import path from 'path';
import upload from "../../common/multer/multer.js";
//Local storage
const localupload = multer({ dest: "uploads/" });
const dockerUpload = multer({ dest: '/app/fileuploadvolume' });
const __dirname = path.resolve();
const router = express.Router();

router.post("/", upload.single("file"), uploadFile);

router.post("/local", localupload.single("file"), localUpload);

router.get("/:fileKey", downloadFile);

router.get("/local/:filename", localDownload);

router.post("/upload", dockerUpload.single("file"), (req, res) => {
  res.send("File uploaded successfully!");
});

router.use("/fileuploadvolume", express.static(path.join(__dirname, "fileuploadvolume")));

export default router;
