import express from "express";
import passport from "passport";
import {
  createUser,
  forgotPassword,
  getUsers,
  login,
  resetPassword,
  searchUsers,
  sendOtpByEmail,
  verifyEmailOtp,
  verifyResetToken,
} from "./controller.js";

const router = express.Router();

router.post("/", createUser);

router.post("/login", passport.authenticate("local"), login);

//router.get("/", authorizeModule("user"), getUsers);

router.get("/", getUsers);

router.post("/send-otp", sendOtpByEmail);

router.post("/verify-otp", verifyEmailOtp);

router.post("/forgot-password", forgotPassword);

router.get("/:token", verifyResetToken);

router.get("/user-search/filter", searchUsers);

router.post("/reset-password", resetPassword);

export default router;
