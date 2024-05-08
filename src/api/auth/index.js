import express from "express";
import {
  createUser,
  forgotPassword,
  getUsers,
  login,
  resetPassword,
  sendOtpByEmail,
  verifyEmailOtp,
  verifyResetToken,
} from "./controller.js";
//import passport from "../../common/openid/passport.js";
import passport from "passport";
import authorizeModule from "../../common/openid/access.js";

const router = express.Router();

router.post("/", createUser);

//router.post("/google", sigin)

router.post(
  "/login",
  passport.authenticate('local'),
  login
);

router.get("/", authorizeModule('user'), getUsers);

router.post("/send-otp",authorizeModule('user'), sendOtpByEmail);

router.post("/verify-otp", authorizeModule('user'), verifyEmailOtp);

router.post("/forgot-password",  forgotPassword);

router.get("/:token", verifyResetToken);

router.post("/reset-password", resetPassword);

export default router;
