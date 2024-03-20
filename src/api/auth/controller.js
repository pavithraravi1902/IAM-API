import { createUserService, loginService, sendOTPByEmailService, verifyOtpService } from "./service.js";

export const createUser = (req, res) => {
  createUserService(req.body)
    .then((user) => {
      res.status(200).json({ message: "User created successfully", user });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal server error" });
    });
};

export const login = async (req, res) => {
  try {
    const user = await loginService(req);
    res.status(200).json({ message: "User login successfully", user });
  } catch (error) {
    res
      .status(error.status || 401)
      .json({ message: error.message || "Authentication failed" });
  }
};

export const sendOtpByEmail = async (req, res) => {
  try {
    const user = await sendOTPByEmailService(req);
    res.status(200).json({ message: "OTP Sent to the Email successfully" });
  } catch (error) {
    res
      .status(error.status || 401)
      .json({ message: error.message || "Invalid" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const verify = await verifyOtpService(req.body);
    res.status(200).json({ message: verify });
  } catch (error) {
    res
      .status(error.status || 401)
      .json({ message: error.message || "OTP verification failed" });
  }
};
