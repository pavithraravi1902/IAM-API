import { sendEmail } from "../../common/openid/otp.js";
import { EmailTemplate } from "./model.js";

export const addEmailTemplateService = async (body) => {
  try {
    const template = await EmailTemplate.create(body);
    return template;
  } catch (error) {
    throw new Error(error ? error : "Failed to created template");
  }
};

export const getEmailTemplateService = async ({ name }) => {
  try {
    const emailTemplate = await EmailTemplate.find({ name: name });
    return emailTemplate;
  } catch (error) {
    throw new Error(error ? error : `Failed to fetch ${name}`);
  }
};

export const getAllEmailTemplateService = async () => {
  try {
    const template = await EmailTemplate.find();
    return template;
  } catch (error) {
    throw new Error(error ? error : "Failed to fetch all email template");
  }
};

export const updateEmailTemplateService = ({ name }, body) => {
  try {
    const template = EmailTemplate.findOneAndUpdate({ name }, body);
    return template;
  } catch (error) {
    throw new Error(error ? error : "Failed to update data");
  }
};

export const deleteEmailTemplateService = async ({ name }) => {
  try {
    const template = EmailTemplate.findByIdAndDelete({ name });
    return { message: `${name} deleted successfully` };
  } catch (error) {
    throw new Error(error ? error : "Failed to update data");
  }
};

export const sendUserNotificationService = async ({ email, subject, content }) => {
  try {
    const mailInfo = {
      to: email,
      subject: subject,
      text: content,
    };
    await sendEmail(mailInfo);
    return { message: "Mail sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error); 
    throw new Error(error.message || "Failed to send email");
  }
};