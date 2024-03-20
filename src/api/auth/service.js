import { jwtSecretKey } from "../../common/openid/jwt.js";
import { User } from "./model.js";
import passport from "../../common/openid/passport.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  console.log(otp);
  return otp.toString();
};

export const createUserService = async (userData) => {
  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.status = 400;
      throw error;
    }
    const user = await User.create(userData);
    if (!user) {
      const error = new Error("Error while creating user");
      error.status = 400;
      throw error;
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export const loginService = async (req, res) => {
  try {
    return new Promise((resolve, reject) => {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          return reject(err);
        }
        if (!user) {
          return reject(new Error(info.message));
        }
        const payload = {
          userId: user.id,
          email: user.email,
        };
        const token = jwt.sign(payload, jwtSecretKey, { expiresIn: "1h" });
        user.token = token;
        resolve({ token: token, user: user });
      })(req);
    });
  } catch (error) {
    throw error;
  }
};

export const sendOTPByEmailService = async (email) => {
  const generatedOtp = generateOtp();
  console.log(generatedOtp, "sendgen");
  const expirationTimeMs = 1 * 60 * 1000;
  console.log(expirationTimeMs, "expirationTimeMs")
  const expirationTimestamp = Date.now() + expirationTimeMs;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pavithraravi1902@gmail.com",
      pass: "sxtd tzwb lxba sbcq", // google project password
    },
  });

  const mailOptions = {
    from: "pavithraravi1902@gmail.com",
    to: "pavithrar@bloomlync.com",
    subject: "Your OTP for MFA",
    text: `Your OTP is: ${generatedOtp}. This OTP is valid for 1 minutes. Please use it before ${expirationTimestamp}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("not send");
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
    try {
      User.findOneAndUpdate(
        { email: "pavithrar@bloomlync.com" },
        { otp: generatedOtp, otpExpiration: expirationTimestamp }
      );
    } catch (error) {
      console.log("Failed to store OTP in the database");
      console.log(error);
    }
  });
};

export const verifyOtpService = async (email, userOtp) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user || !user.otp || !user.otpExpiration) {
      console.log("OTP not found or expired for the user");
      return false;
    }
    if (Date.now() > user.otpExpiration) {
      console.log("OTP has expired");
      return false;
    }
    if (user.otp === userOtp) {
      console.log(user.otp, userOtp, "userOtp")
      console.log("OTP verified successfully");
      return true;
    } else {
      console.log("Invalid OTP. Please try again.");
      return false;
    }
  } catch (error) {
    console.log("Error while verifying OTP");
    console.log(error);
    return false;
  }
};
