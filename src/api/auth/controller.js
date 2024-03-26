import { createUserService, forgotPasswordService, loginService, resetPasswordService, sendOTPByEmailService, verifyOtpService, verifyResetTokenService } from "./service.js";

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
  const {email} = req.body
  try {
    const user = await sendOTPByEmailService(email);
    res.status(200).json({ message: "OTP Sent to the Email successfully" });
  } catch (error) {
    res
      .status(error.status || 401)
      .json({ message: error.message || "Invalid" });
  }
};

export const verifyOtp = async (req, res) => {
  const {email, otp} = req.body
  try {
    const verify = await verifyOtpService(email, otp);
    res.status(200).json({ message: verify });
  } catch (error) {
    res
      .status(error.status || 401)
      .json({ message: error.message || "OTP verification failed" });
  }
};

export const forgotPassword = async (req, res) => {
  const {email} = req.body
  try {
    const user = await forgotPasswordService(email);
    res.status(200).json({ message: user });
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ message: error.message || "Internal Server Error" });
  }
};

export const verifyResetToken = async (req, res) => {
  const {token} = req.body
  try {
    const user = await verifyResetTokenService(token);
    res.status(200).json({ message: user });
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ message: error.message || "Invalid token" });
  }
};

export const resetPassword = async (req, res) => {
  const {newPassword, email} = req.body
  try {
    const user = await resetPasswordService(email, newPassword);
    res.status(200).json({ message: user });
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ message: error.message || "Failed to update Password" });
  }
};
