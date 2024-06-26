import mongoose, { Schema } from "mongoose";
import pkg from "rand-token";
const { uid } = pkg;

const FileUploadSchema = new Schema({
  originalFileName: {
    type: String,
  },
  fileKey: {
    type: String,
    unique: true,
    index: true,
    default: () => uid(32),
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const FileUpload = mongoose.model("FileUpload", FileUploadSchema);

export const schema = FileUpload.schema;

const LocalUploadSchema = new Schema({
  filename: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const LocalFileUpload = mongoose.model(
  "LocalFileUpload",
  LocalUploadSchema
);

export const localschema = LocalFileUpload.schema;
