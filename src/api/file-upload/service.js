import { FileUpload } from "./model.js";
import s3Client from "../../common/aws/index.js";

export const doDownloadService = async (req, res) => {
  const filekey = req.params.fileKey;
  const params = {
    Bucket: "userauthentication",
    Key: filekey,
  };
  try {
    const s3Stream = s3Client.getObject(params).createReadStream();
    s3Stream.on("error", (err) => {
      console.error("Error during S3 object retrieval:", err);
      res.status(500).json({ error: "Error retrieving file from S3" });
    });
    console.log(res, "download res");
    s3Stream.pipe(res);
  } catch (error) {
    console.error("Error retrieving file from S3:", error);
    res.status(500).json({ error: "Error retrieving file from S3" });
  }
};

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

    s3Client.upload(uploadParams, (err, data) => {
      if (err) {
        console.error("Error during S3 upload:", err);
        return res.status(500).json({ error: "Error during S3 upload" });
      }

      res.json(newFile);
    });
  } catch (error) {
    console.error("Error during file creation:", error);
    res.status(500).json({ error: "Error during file creation" });
  }
};
