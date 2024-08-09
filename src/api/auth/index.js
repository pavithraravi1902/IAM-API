import express from "express";
import passport from "passport";
import authorizeModule from "../../common/openid/access.js";
import {
  createAdminUser,
  createUser,
  forgotPassword,
  getUsers,
  login,
  resetPassword,
  searchUsers,
  sendOtpByEmail,
  setSecurityQuestions,
  setupAuthenticatorTotp,
  verifyEmailOtp,
  verifyResetToken,
  verifySecurityQuestions
} from "./controller.js";
import { authenticate } from "../../common/openid/jwt.js";

const router = express.Router();

router.post("/", createUser);

router.post("/admin-user", createAdminUser)

router.post("/login", passport.authenticate("local"), login);

//router.get("/", authorizeModule("user"), getUsers);

router.get("/", authorizeModule("user"), getUsers);

router.post("/send-otp", sendOtpByEmail);

router.post("/verify-otp", verifyEmailOtp);

router.post("/forgot-password", forgotPassword);

router.get("/verify-token/:token", verifyResetToken);

router.get("/user-search/filter", authorizeModule("user"), searchUsers);

router.post("/reset-password", resetPassword);

router.get("/setup-mfa", setupAuthenticatorTotp);

router.post("/security-questions", authenticate, setSecurityQuestions);

router.post("/verify-security-questions", authenticate, verifySecurityQuestions);

export default router;
