import express from "express";
import { createUser, login } from "./controller.js";
import passport from "../../common/openid/passport.js";

const router = express.Router();

router.post("/", createUser);

//router.get("/login", login);

router.get('/login', passport.authenticate('local'), login);

export default router;
