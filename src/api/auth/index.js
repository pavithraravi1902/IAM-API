import express from "express";
import { createUser, login } from "./controller.js";

const router = express.Router();

router.post('/', createUser);

router.get('/login', login)

export default router;
