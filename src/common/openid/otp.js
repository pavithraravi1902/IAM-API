import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { jwtSecretKey } from "./jwt.js";
import springedge from "springedge";

export const verifyOTP = (userInputOTP, generatedOtp) => {
  return userInputOTP === generatedOtp;
};

export const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};

export const sendEmail = async (mailInfo) => {
  const { to, subject, text } = mailInfo;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pavithraravi1902@gmail.com",
      pass: "woqx qffd eyvp jkgh",
      //  https://myaccount.google.com/apppasswords
    },
  });
  const mailOptions = {
    from: "pavithraravi1902@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const generateResetToken = (payload) => {
  const token = jwt.sign(payload, jwtSecretKey, { expiresIn: "1h" });
  const activationToken = ActivationToken({ clientId, token, expiresAt });
  return token;
};
