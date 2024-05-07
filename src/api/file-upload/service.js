import fs from "fs";
import { FileUpload } from "./model.js";

export const uploadFileService = (req, res) => {
  try {
    var uploadFile = {
      originalFileName: req.file.originalname,
    };
    const file = FileUpload.create(uploadFile);
    console.log(req.file.originalname, "file");
    return "file";
  } catch (err) {
    console.log(err);
  }
};

export const downloadFileService = async (req, res) => {
  try {
    const fileKey = req.params.filekey;
    console.log(req.params.filekey, "req.params.filekey");
    const fileRecord = await FileUpload.findOne({
      fileKey: "ABdFL1zl1qgq2z33krBSTttmNVkdFOYt",
    });
    console.log(fileRecord, "fileRecord");
    if (!fileRecord) {
      return res.status(404).json({ message: "File not found" });
    }
    const filePath = fileRecord.filePath;
    const originalFileName = fileRecord.originalFileName;
    if (fs.existsSync(filePath)) {
      res.download(filePath, originalFileName);
    } else {
      res.status(404).json({ message: "File not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
