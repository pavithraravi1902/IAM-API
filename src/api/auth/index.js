import express from "express";
import { createUser, forgotPassword, login, resetPassword, sendOtpByEmail, verifyOtp, verifyResetToken } from "./controller.js";
//import passport from "../../common/openid/passport.js";
import passport from "passport";

const router = express.Router();

router.post("/", createUser);

//router.get("/login", login);

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

router.post("/send-otp", sendOtpByEmail);

router.post("/verify-otp", verifyOtp);

router.post("/forgot-password", forgotPassword);

router.get("/:token", verifyResetToken);

router.post("/reset-password", resetPassword);


export default router;
