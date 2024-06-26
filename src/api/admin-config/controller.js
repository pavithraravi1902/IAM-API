import {
  addEmailTemplateService,
  deleteEmailTemplateService,
  getAllEmailTemplateService,
  getEmailTemplateService,
  sendUserNotificationService,
  updateEmailTemplateService,
} from "./service.js";

export const addEmailTemplate = async ({ body }, res) => {
  try {
    const template = await addEmailTemplateService(body);
    res
      .status(201)
      .json({ message: "Email Template added successfully", template });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || "Failed to create email template" });
  }
};

export const getAllEmailTemplate = async (req, res) => {
  try {
    const templates = await getAllEmailTemplateService();
    res
      .status(200)
      .json({ message: "Successfully retrieved email templates", templates });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || "Failed to fetch email templates" });
  }
};

export const getEmailTemplate = async ({ params }, res) => {
  try {
    const template = await getEmailTemplateService(params);
    res
      .status(200)
      .json({ message: "Successfully fetched email template", template });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || "Failed to fetch email template" });
  }
};

export const updateEmailTemplate = async ({ params, body }, res) => {
  try {
    const template = await updateEmailTemplateService(params, body);
    res
      .status(200)
      .json({ message: "Email template successfully updated!", template });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || "Error while processing" });
  }
};

export const deleteEmailTemplate = async ({ params }, res) => {
  try {
    const response = await deleteEmailTemplateService(params);
    res.status(200).json({ message: response.message });
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to remove data" });
  }
};

export const sendUserNotification = async (req, res) => {
  const { email, subject, content } = req.body;

  if (!email || !subject || !content) {
    return res
      .status(400)
      .json({ message: "Email, subject, and content are required" });
  }

  try {
    const response = await sendUserNotificationService({
      email,
      subject,
      content,
    });
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Failed to send notification" });
  }
};
