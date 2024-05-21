import { doDownloadService, doLocalDownloadService, doLocalUploadService, doUploadService } from "./service.js";

export const uploadFile = (req, res) => {
  doUploadService(req, res);
};

export const downloadFile = (req, res) => {
  doDownloadService(req, res);
};

export const localUpload = (req, res) => {
  doLocalUploadService(req, res);
};

export const localDownload = (req, res) => {
  doLocalDownloadService(req, res);
};