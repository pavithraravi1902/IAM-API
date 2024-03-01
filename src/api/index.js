const express = require("express");
import user from "./auth"

const router = express.Router();

router.use("/users", user);