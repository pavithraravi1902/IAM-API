import { doDownloadService, doUploadService } from "./service.js";

export const uploadFile = (req, res) => {
  doUploadService(req, res);
};

export const downloadFile = (req, res) => {
  doDownloadService(req, res);
};
