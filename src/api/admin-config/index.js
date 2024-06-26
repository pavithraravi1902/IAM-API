import express from "express";
import {
  addEmailTemplate,
  deleteEmailTemplate,
  getAllEmailTemplate,
  getEmailTemplate,
  sendUserNotification,
  updateEmailTemplate,
} from "./controller.js";

const router = express.Router();

router.post("/email-templates", addEmailTemplate);

router.get("/email-templates", getAllEmailTemplate);

router.get("/email-templates/:name", getEmailTemplate);

router.put("/email-templates/:name", updateEmailTemplate);

router.delete("/email-templates/:name", deleteEmailTemplate);

router.post("/send-mail", sendUserNotification);

export default router;
