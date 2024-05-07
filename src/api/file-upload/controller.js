import { downloadFileService, uploadFileService } from "./service.js";

export const uploadFile = (req, res) => {
  uploadFileService(req, res);
};

export const downloadFile = (req, res) => {
  downloadFileService(req, res);
};
