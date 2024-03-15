import express from "express";
import { createUser, login } from "./controller.js";
//import passport from "../../common/openid/passport.js";
import passport from "passport";

const router = express.Router();

router.post("/", createUser);

//router.get("/login", login);

router.post(
  "/login",
  passport.authenticate(
    "local"
    // {
    //     successRedirect: 'http://localhost:4201/index',
    //     failureRedirect: 'http://localhost:4201/login',
    //     failureFlash: true
    //   }
  ),
  login
);

// router.get('/google/callback', accessToken);

// router.post('/sigin', sigin);

export default router;
