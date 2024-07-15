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
  setupOtp,
  verifyEmailOtp,
  verifyResetToken,
} from "./controller.js";
import authorizeModule from "../../common/openid/access.js";

const router = express.Router();

router.post("/", createUser);

router.post("/login", passport.authenticate("local"), login);

//router.get("/", authorizeModule("user"), getUsers);

router.get("/", authorizeModule('user'), getUsers);

router.post("/send-otp", sendOtpByEmail);

router.post("/verify-otp", verifyEmailOtp);

router.post("/forgot-password", forgotPassword);

router.get("/verify-token/:token", verifyResetToken);

router.get("/user-search/filter", authorizeModule('user'), searchUsers);

router.post("/reset-password", resetPassword);

router.get("/setup-mfa", setupOtp);

export default router;
