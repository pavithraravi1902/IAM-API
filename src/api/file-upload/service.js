import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import s3Client from "../../common/aws/index.js";
import { FileUpload, LocalFileUpload } from "./model.js";
const __dirname = path.resolve();

export const doUploadService = async (req, res) => {
  try {
    const uploadFile = {
      originalFileName: req.file.originalname,
    };
    const newFile = await FileUpload.create(uploadFile);

    const uploadParams = {
      Bucket: "userauthentication",
      Key: newFile.fileKey,
      Body: req.file.buffer,
    };

    const putObjectCommand = new PutObjectCommand(uploadParams);
    await s3Client.send(putObjectCommand);
    res.json(newFile);
  } catch (error) {
    console.error("Error during file creation:", error);
    res.status(500).json({ error: "Error during file creation" });
  }
};

export const doDownloadService = async (req, res) => {
  const filekey = req.params.fileKey;
  const params = {
    Bucket: "userauthentication",
    Key: filekey,
  };
  try {
    const getObjectCommand = new GetObjectCommand(params);
    const data = await s3Client.send(getObjectCommand);
    const stream = data.Body; // Use the Readable stream directly
    stream.pipe(res);
  } catch (error) {
    console.error("Error retrieving file from S3:", error);
    res.status(500).json({ error: "Error retrieving file from S3" });
  }
};

export const doLocalUploadService = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const fileData = await LocalFileUpload.create({
    filename: req.file.filename,
  });
  res.json({ message: "File uploaded successfully", fileData });
};

export const doLocalDownloadService = async (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(
    "/Users/Pavithra R/OneDrive/Desktop/Student Application/Student Application/user-authentication/uploads",
    filename
  );
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    res.send(fileContent);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    res.status(500).json({ error: "Error reading file" });
  }
};
