import express from "express";
import { createUser, login } from "./controller.js";
import passport from 'passport';
import configurePassport from "../../common/openid/passport.js";

const router = express.Router();

configurePassport();

router.post("/", createUser);

router.get(
  "/login",
  passport.authenticate("openidconnect", { failureRedirect: "/login" }),
  login
);

export default router;
