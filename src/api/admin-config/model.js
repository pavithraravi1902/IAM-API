import mongoose, { Schema } from "mongoose";

const EmailTemplateConfig = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    strict: true,
    timestamps: true,
  }
);
export const EmailTemplate = mongoose.model(
  "EmailTemplate",
  EmailTemplateConfig
);
