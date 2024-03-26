import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "./jwt.js";


export const verifyOTP = (userInputOTP, generatedOtp) => {
  return userInputOTP === generatedOtp;
};

export const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};

export const sendEmail = async (mailInfo) => {
  const {email, subject, content} = mailInfo;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pavithraravi1902@gmail.com",
      pass: "sxtd tzwb lxba sbcq", // google project password
    },
  });

  const mailOptions = {
    from: 'pavithraravi1902@gmail.com', 
    to: email,
    subject: subject,
    text: content,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const generateResetToken = (payload)=>{
  const token = jwt.sign(payload, jwtSecretKey, { expiresIn: "1h" });
  return token;
}

