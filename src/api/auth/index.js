import express from "express";
import {
  createUser,
  forgotPassword,
  getUsers,
  login,
  resetPassword,
  sendOtpByEmail,
  verifyEmailOtp,
  verifyResetToken
} from "./controller.js";
//import passport from "../../common/openid/passport.js";
import passport from "passport";

const router = express.Router();

router.post("/", createUser);

//router.post("/google", sigin)

router.post(
  "/login",
  passport.authenticate(
    "local"
    // ,{
    //     successRedirect: 'http://localhost:4201',
    //     failureRedirect: 'http://localhost:4201/login',
    //     failureFlash: true
    //   }
  ),
  login
);

router.get("/", getUsers)

router.post("/send-otp", sendOtpByEmail);

router.post("/verify-otp", verifyEmailOtp);

router.post("/forgot-password", forgotPassword);

router.get("/:token", verifyResetToken);

router.post("/reset-password", resetPassword);

export default router;
